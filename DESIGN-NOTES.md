# Homepage redesign

Reference inspected: supplied 3.715-second video. Thin navigation; suspended objects on a narrow rail; tiny labels and prices; wide negative space; large lower-left headline. The visible row translates horizontally with subtle relative depth. The footage does not establish a full-page scroll sequence or section transitions.

Implementation: sage/ivory brand colors and existing logo, original lightweight SVG editorial objects, verified existing book cover stored locally, horizontally scrollable collection, bounded ambient motion with pause/reduced-motion support. Normal vertical scrolling, no scroll hijacking. Open editorial service rows and retained comparison slider.

Existing service, portfolio, shop, books, about and contact routes remain. Etsy, Amazon and Instagram destinations are retained. Demo products/prices and illustrative visuals are identified. Checkout, stock and consultation delivery remain unconnected MVP functionality.

Shared fixes: mobile menu under 620px; menu expanded state and Escape; dialog focus containment, Escape and focus restoration; hidden cart inertness; malformed/unavailable local-storage handling; clear unsent form status.

No framework, third-party JS, webfont download or build step is required. GitHub Pages serves the root HTML.
