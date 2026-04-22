import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { useEffect, useRef } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import Glide from "@glidejs/glide";

export default function Edit( { clientId } ) {
  const blockProps = useBlockProps();
  const glideRef = useRef(null);

  const slideCount = useSelect(
    ( select ) => select( "core/block-editor" ).getBlockCount( clientId ),
    [ clientId ]
  );

  const innerBlocksProps = useInnerBlocksProps(
    { className: "glide__slides" },
    { allowedBlocks: ["cns-theme/slide"] }
  );

  useEffect(() => {
    if (!glideRef.current) return;
    const glide = new Glide(glideRef.current, { draggable: false }).mount();
    return () => glide.destroy();
  });

  return (
    <div {...blockProps}>
      <div className="cns-slideshow__wrapper">
        <div className="glide" ref={glideRef}>
          <div className="glide__track" data-glide-el="track">
            <ul {...innerBlocksProps} />
          </div>
          <div className="glide__arrows" data-glide-el="controls">
            <button className="glide__arrow glide__arrow--left" data-glide-dir="&lt;">‹</button>
            <button className="glide__arrow glide__arrow--right" data-glide-dir="&gt;">›</button>
          </div>
          { slideCount > 1 && (
            <div className="glide__bullets" data-glide-el="controls[nav]">
              { Array.from( { length: slideCount }, ( _, i ) => (
                <button key={i} className="glide__bullet" data-glide-dir={ `=${ i }` } />
              ) ) }
            </div>
          ) }
        </div>
      </div>
    </div>
  );
}
