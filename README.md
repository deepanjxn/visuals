# art.d-s.me

An infinite visual playground — a portfolio project exploring interactive art, physics-based layouts, and immersive browsing.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **GSAP**
- **Framer Motion**
- **Lenis**

## Folder Structure

```
src/
  app/                   # App Router pages & layouts
  components/
    Background/          # Canvas-based background layer
    Canvas/              # Shared canvas utilities
    Grid/                # Artwork grid container
    GridCell/            # Individual grid cell
    CardPadding/         # Card spacing / padding logic
    CardMedia/           # Card media display
    ArtworkImage/        # Optimized artwork image component
    Viewer/              # Full-screen artwork viewer
    Navigation/          # Navigation controls
  hooks/
    useCamera.ts         # Camera/viewport hook
    useDrag.ts           # Drag interaction hook
    useViewer.ts         # Viewer state hook
  lib/
    artworks.ts          # Artwork data & fetching
    constants.ts         # App-wide constants
    physics.ts           # Physics / spring helpers
    camera.ts            # Camera math
    utils.ts             # Shared utilities
  styles/                # Additional stylesheets
  types/                 # TypeScript type definitions
public/
  placeholders/          # Placeholder images
  icons/                 # UI icons
```

## Status

**Phase One — Project initialization.** The foundation is laid with all dependencies configured. The app renders an empty dark canvas.

## Roadmap

- **Phase Two:** Artwork grid with physics-based layout
- **Phase Three:** Full-screen viewer with smooth navigation
- **Phase Four:** Infinite scroll & dynamic loading
- **Phase Five:** Performance optimization & refinements
