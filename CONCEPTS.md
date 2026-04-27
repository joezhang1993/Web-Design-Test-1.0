# Concept development (image generation prompts)

Concept prompts used to guide the final rendered mechanical layers:

1. **Exploded Movement Hero**  
   "Luxury Swiss watch movement exploded view, dark atelier background, warm gold accents, brushed steel, high-detail macro product rendering, cinematic lighting, no text"
2. **Bridge & Barrel Detail**  
   "Close-up of twin mainspring barrels and sweeping watch bridge, hand-finished bevels, polished screws, premium horology style, neutral shadows"
3. **Escapement and Balance Focus**  
   "Mechanical escapement wheel and free-sprung balance wheel, precision macro, fine texture realism, museum-grade lighting"
4. **Assembled Dial Reveal**  
   "Complete high-complication watch dial with blued steel hands, enamel dial ring, contemporary luxury Swiss branding aesthetic"

排查结论：之前“更新不了”的主要风险点是 `img + dataURL` 方案可能被部署端 CSP（`img-src`）限制。

当前实现改为：直接在页面中的 Canvas 图层绘制机械部件（无二进制、无 dataURL），因此更容易在受限环境正常更新与显示。
