# Figma Integration Guide

## Overview
This project supports Figma Dev Mode MCP for seamless design-to-code workflow. This allows AI assistants to access real design data from Figma instead of working from screenshots.

## Setup Instructions

### 1. Figma Requirements
- **Figma Desktop App** (required - browser version won't work)
- **Plan**: Dev or Full seat on Professional, Organization, or Enterprise plan
- **Dev Mode**: Press `Shift + D` to enable

### 2. Configure Your AI Editor

#### For Cursor
1. Open Settings → Features → Beta
2. Enable "Model Context Protocol"
3. Add Figma MCP server configuration

#### For Claude Desktop
1. Edit `~/.config/claude/claude_desktop_config.json`
2. Add Figma server configuration

#### For VS Code (with MCP extension)
1. Install MCP extension
2. Configure Figma server in settings

### 3. Design File Structure

Organize your Figma files with these components:

#### OG Images (1200x630px)
```
📁 OG Images
  ├── 📄 Logo Centered Template
  ├── 📄 Shop with Products
  ├── 📄 Coming Soon States
  └── 📄 Empty Shop State
```

#### Bundle Images (1536x2048px)
```
📁 Bundle Images
  ├── 📄 1 Product Layout
  ├── 📄 2 Products Grid
  ├── 📄 3 Products Grid
  ├── 📄 4 Products Grid
  └── 📄 5 Products Grid
```

#### Design System
```
📁 Design System
  ├── 📁 Colors
  │   ├── Brand Primary
  │   ├── Brand Secondary
  │   └── Neutrals
  ├── 📁 Typography
  │   ├── Suisse Int'l
  │   └── PPTelegraf
  └── 📁 Components
      ├── PoweredBy Section
      ├── Shop Logos
      └── Product Cards
```

## Workflow

### Design → Code Process

1. **Designer Creates/Updates in Figma**
   - Design component at correct dimensions
   - Use consistent naming conventions
   - Apply design tokens (colors, fonts, spacing)
   - Add annotations for interactions/states

2. **Developer Implements with AI**
   - Open Figma desktop app
   - Switch to Dev Mode (`Shift + D`)
   - Select the component to implement
   - In AI editor: "Implement this Figma component for OG image generation"
   - AI receives actual design data (not screenshots)

3. **Verify in Storybook**
   - Run `npm run storybook`
   - Compare implementation with Figma design
   - Check responsive behavior
   - Test with real data

## Component Mapping

| Figma Component | Code Component | Location |
|-----------------|---------------|----------|
| OG Logo Centered | LogoCenteredComponent | `/services/og-generator/components/` |
| Bundle Grid | BundleGridComponent | `/services/bundles-generator/components/` |
| Powered By | PoweredBySection | `/services/og-generator/components/shared/` |

## Best Practices

### Naming Conventions
- Use consistent names between Figma and code
- Prefix with component type (OG_, Bundle_, Shared_)
- Use descriptive names for variants

### Design Tokens
- Define colors as CSS variables in Figma
- Map font families to available web fonts
- Use 8px grid system for spacing

### Component Properties
- Mark required vs optional props in Figma
- Add descriptions for complex properties
- Include example content in designs

## Troubleshooting

### "Can't connect to Figma"
- Ensure Figma desktop app is running
- Check Dev Mode is enabled (`Shift + D`)
- Verify you have proper permissions

### "No design context available"
- Select a specific frame/component in Figma
- Make sure you're in Dev Mode
- Check MCP server is running (`http://127.0.0.1:3845/mcp`)

### "Generated code doesn't match design"
- Verify design tokens are properly defined
- Check component is at correct dimensions
- Ensure fonts are available in the project

## Example Prompts

With Figma integration active:

```
"Generate the OG image component from the selected Figma frame"
"Update the bundle grid layout to match the Figma design"
"Apply the color scheme from Figma to the PoweredBy section"
"Implement the typography system from our Figma design tokens"
```

## Resources

- [Figma Dev Mode Documentation](https://help.figma.com/hc/en-us/articles/360039958534)
- [MCP Protocol Specification](https://modelcontextprotocol.org)
- [Figma API Documentation](https://www.figma.com/developers/api)