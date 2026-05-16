# ReactBits Installer

[![npm version](https://badge.fury.io/js/reactbits-installer.svg)](https://www.npmjs.com/package/reactbits-installer)

**Instantly install 120+ animated React components from [ReactBits.dev](https://reactbits.dev).**

✨ All components bundled - NO GitHub API calls, NO rate limits!

## Quick Start

```bash
npx reactbits-installer
```

That's it! Components are copied to `./components/reactbits/`.

## Usage

```bash
# Install missing components
npx reactbits-installer

# Check what's available  
npx reactbits-installer --check

# List all bundled components
npx reactbits-installer --list

# Custom output directory
npx reactbits-installer --output ./src/ui/reactbits

# Reinstall all (overwrite existing)
npx reactbits-installer --force

# Short alias
npx rbi
```

## What's Included (120+ components)

| Category | Examples |
|----------|----------|
| **Text Animations** | SplitText, GlitchText, BlurText, DecryptedText, RotatingText |
| **Animations** | ClickSpark, Magnet, SplashCursor, MetaBalls, Ribbons |
| **Components** | SpotlightCard, Carousel, CircularGallery, Dock, Folder |
| **Backgrounds** | Aurora, Waves, Hyperspeed, Galaxy, LiquidChrome |

Run `npx rbi --list` to see all components.

## Usage in Your Code

```tsx
import Aurora from '@/components/reactbits/Aurora';
import ClickSpark from '@/components/reactbits/ClickSpark';

export default function Page() {
  return (
    <ClickSpark>
      <Aurora />
      <h1>Hello World</h1>
    </ClickSpark>
  );
}
```

## Features

- ✅ **Instant** - Components bundled, no downloads
- ✅ **No Rate Limits** - No GitHub API calls
- ✅ **TypeScript Ready** - All `.tsx` files
- ✅ **Next.js Ready** - Includes `"use client"` directive
- ✅ **Incremental** - Only installs missing components

## Credits

Components from [ReactBits](https://reactbits.dev) by [David Haz](https://github.com/DavidHDev).

## License

MIT
