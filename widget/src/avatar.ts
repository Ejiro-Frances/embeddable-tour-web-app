import * as THREE from 'three';

export class Avatar {
	private container: HTMLElement;
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private renderer: THREE.WebGLRenderer;
	private sphere: THREE.Mesh;
	private animationId: number | null = null;

	constructor(container: HTMLElement) {
		this.container = container;
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});

		this.init();
		this.sphere = this.createSphere();
		this.scene.add(this.sphere);
		this.animate();
	}

	private init(): void {
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		this.renderer.setClearColor(0x000000, 0);
		this.container.appendChild(this.renderer.domElement);
		this.camera.position.z = 3;
	}

	private createSphere(): THREE.Mesh {
		const geometry = new THREE.SphereGeometry(1, 32, 32);

		// Create gradient material with gold accents
		const material = new THREE.MeshPhongMaterial({
			color: 0xeabe7b,
			emissive: 0x442211,
			specular: 0xffffff,
			shininess: 100,
			wireframe: false,
		});

		// Add lighting
		const light1 = new THREE.DirectionalLight(0xffffff, 1);
		light1.position.set(1, 1, 1);
		this.scene.add(light1);

		const light2 = new THREE.DirectionalLight(0xeabe7b, 0.5);
		light2.position.set(-1, -1, -1);
		this.scene.add(light2);

		const ambientLight = new THREE.AmbientLight(0x404040);
		this.scene.add(ambientLight);

		return new THREE.Mesh(geometry, material);
	}

	private animate = (): void => {
		this.animationId = requestAnimationFrame(this.animate);

		// Gentle rotation and floating effect
		this.sphere.rotation.y += 0.01;
		this.sphere.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
		this.sphere.position.y = Math.sin(Date.now() * 0.002) * 0.1;

		this.renderer.render(this.scene, this.camera);
	};

	public destroy(): void {
		if (this.animationId !== null) {
			cancelAnimationFrame(this.animationId);
		}
		this.container.removeChild(this.renderer.domElement);
		this.renderer.dispose();
	}
}
