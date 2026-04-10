# ThreeJS Shaders

An interactive collection of custom GLSL shader scenes built with Next.js, React Three Fiber, and Three.js.

Live demo: https://three-js-shaders.vercel.app/

## What This Project Includes

- Custom vertex and fragment shaders for multiple visual scenes.
- Real-time rendering with React Three Fiber.
- Orbit camera controls for scene navigation.
- A Leva control panel for tweaking uniforms in the Raging Sea demo.
- Next.js App Router project structure.

## Tech Stack

- Next.js 13
- React 18
- Three.js
- @react-three/fiber
- @react-three/drei
- Leva
- Tailwind CSS

## Project Structure

```text
app/
	page.js                          # Main entry page; chooses which scene to render
	layout.js                        # Root layout + metadata
	globals.css                      # Global styles

	Components/
		Pattern/page.jsx               # Pattern shader scene
		Plane/page.jsx                 # Blob-style animated shader on icosahedron
		RagingSea/page.jsx             # Animated water shader + Leva controls

		shaders/
			Blob/
				vertexShader.js
				fragmentShader.js
			Pattern/
				vertexShader.js
				fragmentShader.js
			RagingSea/
				vertexShader.js
				fragmentShader.js
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

If you prefer another package manager:

```bash
npm install
# or
yarn install
```

### 2. Start the development server

```bash
pnpm dev
```

Open http://localhost:3000.

## Available Scripts

```bash
pnpm dev      # Start local dev server
pnpm build    # Create production build
pnpm start    # Run production server
pnpm lint     # Run Next.js lint checks
```

## Switching Between Shader Scenes

The homepage renders one scene at a time from `app/page.js`.

Current setup renders `RagingSea` by default, while `Pattern` and `Plane` are commented out.

To switch scenes:

1. Open `app/page.js`.
2. Uncomment the scene you want.
3. Comment out the others.

Example:

```jsx
// app/page.js
import Plane from './Components/Plane/page'
import Pattern from './Components/Pattern/page'
import RagingSea from './Components/RagingSea/page'

export default function Home() {
	return (
		<>
			{/* <Pattern /> */}
			{/* <Plane /> */}
			<RagingSea />
		</>
	)
}
```

## Shader Development Guide

### Where to edit shaders

- Blob scene shaders:
	- `app/Components/shaders/Blob/vertexShader.js`
	- `app/Components/shaders/Blob/fragmentShader.js`
- Pattern scene shaders:
	- `app/Components/shaders/Pattern/vertexShader.js`
	- `app/Components/shaders/Pattern/fragmentShader.js`
- Raging Sea shaders:
	- `app/Components/shaders/RagingSea/vertexShader.js`
	- `app/Components/shaders/RagingSea/fragmentShader.js`

### Uniforms and animation

- Time-based animations are updated with `useFrame` in each scene component.
- Material uniforms are created with `useMemo` and passed into `<shaderMaterial />`.
- The Raging Sea scene exposes key uniforms in Leva for live tuning:
	- Wave elevation and frequency
	- Wave speed
	- Depth/surface colors
	- Small-wave controls and iteration count

## Deployment

This project is ready for deployment on Vercel.

Basic flow:

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Use the default Next.js settings.
4. Deploy.

## Troubleshooting

- If the canvas is blank, verify that only one main scene is rendered in `app/page.js`.
- If controls do not appear in Raging Sea, ensure `leva` is installed and imported.
- If shader changes do not update, restart the dev server:

```bash
pnpm dev
```

## License

No license file is currently defined in this repository. Add a `LICENSE` file if you plan to distribute or open-source this project publicly.
