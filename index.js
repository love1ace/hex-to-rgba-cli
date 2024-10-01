#!/usr/bin/env node

const hexToRgba = (hex, alpha = 1) => {
  const cleanedHex = hex.replace('#', '');

  const isValidHex = /^[0-9A-Fa-f]{6}$/i.test(cleanedHex);
  if (!isValidHex) {
    console.error("Invalid hex color. Please provide a valid 6-character hex code.");
    process.exit(1);
  }

  const r = parseInt(cleanedHex.substring(0, 2), 16);
  const g = parseInt(cleanedHex.substring(2, 4), 16);
  const b = parseInt(cleanedHex.substring(4, 6), 16);

  if (alpha < 0 || alpha > 1) {
    console.error("Invalid alpha value. Alpha should be between 0 and 1.");
    process.exit(1);
  }

  return { r, g, b, a: alpha };
};

const [hex, alphaValue] = process.argv.slice(2);
const alpha = parseFloat(alphaValue) || 1;

if (!hex) {
  console.error("Usage: hex2rgba <hex> [alpha]");
  process.exit(1);
}

const { r, g, b, a } = hexToRgba(hex, alpha);

console.log(`HEX: ${hex}`);
console.log(`RGBA: (${r}, ${g}, ${b}, ${a})`);

console.log(`\x1b[48;2;${r};${g};${b}m   COLOR   \x1b[0m`);
console.log(`Alpha: ${a} (not visible in ANSI)`);