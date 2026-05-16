#!/usr/bin/env node

/**
 * ReactBits Installer CLI
 * 
 * Usage:
 *   npx reactbits-installer              # Install missing components
 *   npx reactbits-installer --check      # Check what's available
 *   npx reactbits-installer --force      # Reinstall all components
 *   npx reactbits-installer --list       # List all bundled components
 *   npx reactbits-installer --help       # Show help
 */

const { run, getBundledComponents } = require('../lib/installer');

// Parse CLI arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║            🎨 ReactBits Component Installer v2.0              ║
╚═══════════════════════════════════════════════════════════════╝

Instantly install 120+ animated React components from ReactBits.dev
All components are bundled - NO GitHub API, NO rate limits!

Usage:
  npx reactbits-installer [options]

Options:
  --check     Check what components are available vs installed
  --force     Reinstall all components (overwrites existing)
  --list      List all bundled components
  --output    Output directory (default: ./components/reactbits)
  --help      Show this help message

Examples:
  npx reactbits-installer                    # Install missing components
  npx reactbits-installer --check            # See what's available
  npx reactbits-installer --output ./src/ui  # Custom output directory
  npx reactbits-installer --force            # Reinstall everything

Shortcuts:
  npx rbi                                    # Same as reactbits-installer
`);
  process.exit(0);
}

if (args.includes('--list') || args.includes('-l')) {
  const components = getBundledComponents();
  console.log(`\n🎨 Bundled ReactBits Components (${components.length}):\n`);
  components.sort().forEach(c => console.log(`  • ${c}`));
  console.log('');
  process.exit(0);
}

const options = {
  checkOnly: args.includes('--check'),
  forceDownload: args.includes('--force'),
  outputDir: null
};

// Parse --output flag
const outputIndex = args.indexOf('--output');
if (outputIndex !== -1 && args[outputIndex + 1]) {
  options.outputDir = args[outputIndex + 1];
}

run(options);
