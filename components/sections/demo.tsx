export function DemoSection() {
  return (
    <section id="demo" className="py-24 relative">
      <div className="container mx-auto px-8 py-10">
        <h2 className="text-4xl md:text-4xl font-bold mb-6 text-center">
          See Tourify In Action
        </h2>
        <p className="text-xl text-ivory/80 max-w-3xl mx-auto mb-12 text-center">
          Experience the power of Tourify with our interactive demo. Explore how
          easy it is to create and customize onboarding tours that captivate
          your users.
        </p>
        <div className="flex justify-center">
          <iframe
            src="https://www.youtube.com/embed/ 
dQw4w9WgXcQ"
            title="Tourify Demo"
            width="800"
            height="450"
            className="rounded-2xl shadow-lg border border-amber-300/20"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
