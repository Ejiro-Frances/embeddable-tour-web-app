# Component Migration Guide

This guide shows how to update each dashboard component to use the Supabase backend instead of localStorage.

## 1. Update `tour-stats-card.tsx`

### Current Implementation
```typescript
// Uses hardcoded data with setTimeout
useEffect(() => {
  const timeout = setTimeout(() => {
    setStats([...hardcoded data...])
    setLoading(false)
  }, 2000)
}, [])
```

### New Implementation
```typescript
useEffect(() => {
  async function fetchStats() {
    try {
      const response = await fetch('/api/analytics/stats')
      const data = await response.json()
      
      // Map the stats to the card format
      setStats([
        {
          title: "Total Tours Created",
          value: data.stats.totalToursCreated,
          icon: MapIcon,
        },
        {
          title: "Total Tours Completed",
          value: data.stats.totalToursCompleted,
          icon: CheckCircle2Icon,
        },
        {
          title: "Completion Rate",
          value: `${data.stats.completionRate}%`,
          icon: PercentIcon,
        },
        {
          title: "Steps Skipped",
          value: data.stats.stepsSkipped,
          icon: ForwardIcon,
        },
        {
          title: "Average Tour Duration",
          value: `${data.stats.averageDurationInMinutes} mins`,
          icon: TimerIcon,
        },
        {
          title: "Active Tours Today",
          value: data.stats.activeToursToday,
          icon: FlagIcon,
        },
        {
          title: "Abandon Rate",
          value: `${data.stats.abandonRate}%`,
          icon: CircleSlash2Icon,
        },
      ])
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  fetchStats()
}, [])
```

## 2. Update `tour-chart.tsx`

### Completion Trend
```typescript
useEffect(() => {
  async function fetchData() {
    try {
      // Fetch completion trend
      const trendResponse = await fetch('/api/analytics/completion-trend')
      const trendData = await trendResponse.json()
      setCompletionTrend(trendData.trend)

      // Fetch step analytics
      const stepResponse = await fetch('/api/analytics/step-analytics')
      const stepData = await stepResponse.json()
      
      // Transform to match chart format
      const formattedSteps = stepData.analytics.slice(0, 5).map(item => ({
        step: item.step,
        completed: item.completed,
        skipped: item.skipped,
      }))
      setStepData(formattedSteps)
    } catch (error) {
      console.error('Failed to fetch chart data:', error)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [])
```

## 3. Update `created-tours.tsx`

### Current Implementation
```typescript
const [tours, setTours] = useState<TourFormValues[]>(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("tours")
    return stored ? JSON.parse(stored) : []
  }
  return []
})
```

### New Implementation
```typescript
const [tours, setTours] = useState<TourFormValues[]>([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  async function fetchTours() {
    try {
      const response = await fetch('/api/tours')
      const data = await response.json()
      
      // Transform to match TourFormValues format
      const transformedTours = data.tours.map(tour => ({
        id: tour.id,
        name: tour.name,
        description: tour.description,
        steps: tour.steps.map(step => ({
          id: step.id,
          order: step.order_number,
          title: step.title,
          description: step.description,
        })),
      }))
      
      setTours(transformedTours)
    } catch (error) {
      console.error('Failed to fetch tours:', error)
    } finally {
      setLoading(false)
    }
  }

  fetchTours()
}, [])

// Update delete handler
const handleDelete = async (id: string) => {
  try {
    const response = await fetch(`/api/tours/${id}`, {
      method: 'DELETE',
    })
    
    if (response.ok) {
      setTours(tours.filter((t) => t.id !== id))
      setTourToDelete(null)
    }
  } catch (error) {
    console.error('Failed to delete tour:', error)
  }
}
```

## 4. Update `create-tour-form.tsx`

### Current Implementation
```typescript
const onSubmit = (data: TourFormValues) => {
  setLoading(true)
  
  setTimeout(() => {
    const storedTours = localStorage.getItem("tours")
    const tours = storedTours ? JSON.parse(storedTours) : []
    tours.push(data)
    localStorage.setItem("tours", JSON.stringify(tours))
    router.push("/tours")
    setLoading(false)
  }, 1000)
}
```

### New Implementation
```typescript
const onSubmit = async (data: TourFormValues) => {
  setLoading(true)
  
  try {
    const endpoint = isEditMode ? `/api/tours/${existingTour?.id}` : '/api/tours'
    const method = isEditMode ? 'PATCH' : 'POST'
    
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        steps: data.steps.map((step, index) => ({
          title: step.title,
          description: step.description,
          order: index + 1,
        })),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to save tour')
    }

    const result = await response.json()
    
    if (onTourCreated) onTourCreated(result.tour)
    
    router.push('/tours')
  } catch (error) {
    console.error('Failed to save tour:', error)
    alert('Failed to save tour. Please try again.')
  } finally {
    setLoading(false)
  }
}
```

## 5. Create a Custom Hook for Tours

To make the code cleaner, create a custom hook:

```typescript
// hooks/use-tours.ts
import { useState, useEffect } from 'react'
import { TourFormValues } from '@/app/(dashboard)/_schemas/tour-schema'

export function useTours() {
  const [tours, setTours] = useState<TourFormValues[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTours = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tours')
      const data = await response.json()
      
      const transformedTours = data.tours.map(tour => ({
        id: tour.id,
        name: tour.name,
        description: tour.description,
        steps: tour.steps.map(step => ({
          id: step.id,
          order: step.order_number,
          title: step.title,
          description: step.description,
        })),
      }))
      
      setTours(transformedTours)
      setError(null)
    } catch (err) {
      setError('Failed to fetch tours')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  const deleteTour = async (id: string) => {
    try {
      const response = await fetch(`/api/tours/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setTours(tours.filter((t) => t.id !== id))
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to delete tour:', error)
      return false
    }
  }

  return { tours, loading, error, refetch: fetchTours, deleteTour }
}
```

Then use it in components:

```typescript
// In created-tours.tsx
const { tours, loading, deleteTour } = useTours()

const handleDelete = async (id: string) => {
  const success = await deleteTour(id)
  if (success) {
    setTourToDelete(null)
  }
}
```

## Migration Checklist

- [ ] Run database migration in Supabase
- [ ] Update `tour-stats-card.tsx` to fetch from `/api/analytics/stats`
- [ ] Update `tour-chart.tsx` to fetch from analytics endpoints
- [ ] Update `created-tours.tsx` to fetch from `/api/tours`
- [ ] Update `create-tour-form.tsx` to POST/PATCH to API
- [ ] Create `use-tours.ts` custom hook
- [ ] Add error handling and loading states
- [ ] Test all CRUD operations
- [ ] Remove localStorage dependencies
- [ ] Add toast notifications for success/error states

## Testing

After migration, test the following:

1. ✅ Create a new tour
2. ✅ View all tours
3. ✅ Edit an existing tour
4. ✅ Delete a tour
5. ✅ View dashboard statistics
6. ✅ View completion trends
7. ✅ View step analytics
