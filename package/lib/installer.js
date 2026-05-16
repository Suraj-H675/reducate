/**
 * ReactBits Component Installer
 * 
 * Installs bundled ReactBits components into your project.
 * No GitHub API needed - components are bundled in this package!
 */

const fs = require('fs');
const path = require('path');

// Bundled components are in the package's components folder
const BUNDLED_DIR = path.join(__dirname, '..', 'components');

// ============================================================================
// Component Discovery
// ============================================================================

function getBundledComponents() {
  if (!fs.existsSync(BUNDLED_DIR)) {
    console.error('❌ Bundled components not found! Package may be corrupted.');
    return [];
  }
  
  const files = fs.readdirSync(BUNDLED_DIR);
  return files
    .filter(f => f.endsWith('.tsx'))
    .map(f => f.replace('.tsx', ''));
}

function getExistingComponents(outputDir) {
  if (!fs.existsSync(outputDir)) {
    return new Set();
  }
  const files = fs.readdirSync(outputDir);
  const components = files
    .filter(f => f.endsWith('.tsx') || f.endsWith('.jsx'))
    .map(f => f.replace(/\.(tsx|jsx)$/, ''));
  return new Set(components);
}

// ============================================================================
// Component Installation
// ============================================================================

function installComponent(componentName, outputDir) {
  try {
    const srcPath = path.join(BUNDLED_DIR, `${componentName}.tsx`);
    const destPath = path.join(outputDir, `${componentName}.tsx`);
    
    if (!fs.existsSync(srcPath)) {
      console.log(`  ⚠️  Component not found: ${componentName}`);
      return { success: false, reason: 'Not found in bundle' };
    }
    
    fs.copyFileSync(srcPath, destPath);
    console.log(`  ✅ Installed ${componentName}`);
    return { success: true };
    
  } catch (error) {
    console.log(`  ❌ Failed ${componentName}: ${error.message}`);
    return { success: false, reason: error.message };
  }
}

// ============================================================================
// Public API
// ============================================================================

async function run(options = {}) {
  const {
    checkOnly = false,
    forceDownload = false,
    outputDir = null
  } = options;
  
  const OUTPUT_DIR = outputDir || path.join(process.cwd(), 'components', 'reactbits');
  
  const results = {
    installed: [],
    skipped: [],
    failed: []
  };
  
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║            🎨 ReactBits Component Installer                   ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');
  
  if (checkOnly) {
    console.log('📌 Mode: Check only (no installation)');
  } else if (forceDownload) {
    console.log('📌 Mode: Force reinstall all');
  } else {
    console.log('📌 Mode: Install (missing only)');
  }
  
  console.log(`📂 Output: ${OUTPUT_DIR}`);
  
  // Get bundled components
  const bundledComponents = getBundledComponents();
  console.log(`📦 Bundled components: ${bundledComponents.length}`);
  
  if (bundledComponents.length === 0) {
    console.error('\n❌ No components found in package. Please reinstall.');
    process.exit(1);
  }
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Get existing components
  const existingComponents = getExistingComponents(OUTPUT_DIR);
  console.log(`📁 Your existing: ${existingComponents.size}`);
  
  // Calculate what's missing
  const missing = bundledComponents.filter(c => !existingComponents.has(c));
  console.log(`🆕 New to install: ${missing.length}`);
  
  if (checkOnly) {
    if (missing.length > 0) {
      console.log('\n📋 Components not yet installed:');
      missing.forEach(c => console.log(`   ✨ ${c}`));
    } else {
      console.log('\n✅ All components already installed!');
    }
  } else {
    // Install components
    console.log('\n📥 Installing components...');
    console.log('─'.repeat(50));
    
    for (const componentName of bundledComponents) {
      if (!forceDownload && existingComponents.has(componentName)) {
        results.skipped.push(componentName);
        // Don't log skipped to reduce noise
      } else {
        const result = installComponent(componentName, OUTPUT_DIR);
        if (result.success) {
          results.installed.push(componentName);
        } else {
          results.failed.push({ name: componentName, reason: result.reason });
        }
      }
    }
  }
  
  // Final summary
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                      📊 Final Summary                         ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');
  console.log(`  📦 Total bundled:  ${bundledComponents.length}`);
  console.log(`  ✅ Installed:      ${results.installed.length}`);
  console.log(`  ⏭️  Skipped:        ${results.skipped.length}`);
  console.log(`  ❌ Failed:         ${results.failed.length}`);
  console.log('');
  
  if (results.installed.length > 0) {
    console.log('💡 Import components like:');
    console.log(`   import { Aurora } from '${outputDir ? outputDir.replace(process.cwd(), '.') : './components/reactbits'}/Aurora'`);
    console.log('');
  }
  
  console.log('🎉 Done!');
  
  return results;
}

module.exports = { run, getBundledComponents };
