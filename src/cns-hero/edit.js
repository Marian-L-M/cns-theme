import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  PanelBody,
  SelectControl,
  ColorPicker,
  Button,
  BoxControl,
  RangeControl,
} from "@wordpress/components";

const POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "middle-left",
  "middle-center",
  "middle-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

function getFlexValues(position) {
  const [v, h] = position.split("-");
  return {
    alignItems:
      v === "top" ? "flex-start" : v === "bottom" ? "flex-end" : "center",
    justifyContent:
      h === "left" ? "flex-start" : h === "right" ? "flex-end" : "center",
  };
}

export default function Edit({ attributes, setAttributes }) {
  const {
    mode,
    bannerHeight,
    bgImageID,
    bgImageURL,
    bgColor,
    contentPosition,
    slidePadding,
    overlayPadding,
    authorCredit,
    heroCredit,
  } = attributes;

  const blockProps = useBlockProps();

  const { alignItems, justifyContent } = getFlexValues(contentPosition);
  const containerStyle = {
    alignItems,
    justifyContent,
    paddingTop: slidePadding?.top ?? "0px",
    paddingRight: slidePadding?.right ?? "0px",
    paddingBottom: slidePadding?.bottom ?? "0px",
    paddingLeft: slidePadding?.left ?? "0px",
    backgroundImage: `url(${bgImageURL})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const overlayStyle = {
    paddingTop: overlayPadding?.top ?? "0px",
    paddingRight: overlayPadding?.right ?? "0px",
    paddingBottom: overlayPadding?.bottom ?? "0px",
    paddingLeft: overlayPadding?.left ?? "0px",
    backgroundColor: bgColor ?? "",
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Background">
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) =>
                setAttributes({ bgImageID: media.id, bgImageURL: media.url })
              }
              allowedTypes={["image"]}
              value={bgImageID}
              render={({ open }) => (
                <div style={{ marginTop: "8px" }}>
                  {bgImageURL ? (
                    <img
                      src={bgImageURL}
                      alt=""
                      style={{
                        width: "100%",
                        display: "block",
                        borderRadius: "2px",
                        marginBottom: "8px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        border: "1px dashed #999",
                        borderRadius: "2px",
                        padding: "16px",
                        textAlign: "center",
                        marginBottom: "8px",
                        color: "#999",
                        fontSize: "12px",
                      }}
                    >
                      No image selected
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button onClick={open} variant="secondary" size="small">
                      {bgImageURL ? "Replace" : "Upload Image"}
                    </Button>
                    {bgImageURL && (
                      <Button
                        onClick={() =>
                          setAttributes({
                            bgImageID: undefined,
                            bgImageURL: "",
                          })
                        }
                        variant="link"
                        isDestructive
                        size="small"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>
        <PanelBody title="Display mode">
          <SelectControl
            label="Mode"
            value={mode}
            options={[
              { label: "Unconstrained", value: "unconstrained" },
              { label: "Constrained", value: "constrained" },
              { label: "Fixed Height", value: "fixed" },
            ]}
            onChange={(value) => setAttributes({ mode: value })}
          />
          {(mode === "constrained" || mode === "fixed") && (
            <RangeControl
              label={
                mode == "constrained" ? "Max Height (px)" : "Fixed Height (px)"
              }
              value={bannerHeight}
              min={100}
              max={2560}
              step={10}
              onChange={(value) => setAttributes({ bannerHeight: value })}
            />
          )}
        </PanelBody>
        <PanelBody title="Backdrop">
          <ColorPicker
            color={bgColor}
            onChange={(value) => setAttributes({ bgColor: value })}
            enableAlpha
            defaultValue=""
          />
        </PanelBody>

        <PanelBody title="Content Position">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "4px",
              maxWidth: "120px",
              margin: "8px auto",
            }}
          >
            {POSITIONS.map((pos) => {
              const { alignItems: ai, justifyContent: jc } = getFlexValues(pos);
              const isActive = contentPosition === pos;
              return (
                <button
                  key={pos}
                  onClick={() => setAttributes({ contentPosition: pos })}
                  title={pos}
                  style={{
                    height: "36px",
                    border: isActive ? "2px solid #007cba" : "1px solid #ddd",
                    borderRadius: "2px",
                    background: isActive ? "#007cba22" : "#f0f0f0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: ai,
                    justifyContent: jc,
                    padding: "4px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: isActive ? "#007cba" : "#bbb",
                      display: "block",
                      flexShrink: 0,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </PanelBody>

        <PanelBody title="Container Padding">
          <BoxControl
            label="Padding"
            values={slidePadding}
            onChange={(value) => setAttributes({ slidePadding: value })}
          />
        </PanelBody>
        <PanelBody title="Overlay Padding">
          <BoxControl
            label="Padding"
            values={overlayPadding}
            onChange={(value) => setAttributes({ overlayPadding: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="hero__container" style={containerStyle}>
          <div className="wp-block-cns-theme-cns-hero-overlay">
            <div className="hero__overlay" style={overlayStyle}>
              <InnerBlocks />
            </div>
            <a href="" class="hero__credits hero__credits--reference">
              Rozendale in the year HEM1
            </a>
            <a href="" class="hero__credits hero__credits--author">
              Map by Eugene Jonathan
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
