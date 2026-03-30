// ============================================================================
// AestheticRecipeSamples_Batch2.cs — Academic citation style recipes (APA 7, MLA 9)
// ============================================================================
// Recipes 8-9: Strict compliance with academic citation style guides.
// These are NOT aesthetic "design" choices — they are codified standards
// mandated by publishers, universities, and professional organizations.
//
// UNIT REFERENCE:
//   Font size: half-points (22 = 11pt, 24 = 12pt, 32 = 16pt)
//   Spacing:   DXA = twentieths of a point (1440 DXA = 1 inch)
//   Borders:   eighth-points (4 = 0.5pt, 8 = 1pt, 12 = 1.5pt)
//   Line spacing "line": 240ths of single spacing (240 = 1.0x, 480 = 2.0x)
// ============================================================================

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

using WpPageSize = DocumentFormat.OpenXml.Wordprocessing.PageSize;

namespace MiniMaxAIDocx.Core.Samples;

public static partial class AestheticRecipeSamples
{
    // ══════════════════════════════════════════════════�