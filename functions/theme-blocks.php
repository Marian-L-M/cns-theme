<?php
// Marked for deletion. Logic moved to register_block_type_from_metadata
/**
 * Register custom block
 */
class JSXBlock
{
    public function __construct($name, $renderCallback = null, $data = null)
    {
        $this->name = $name;
        $this->data = $data;
        $this->renderCallback = $renderCallback;
        add_action("init", [$this, "onInit"]);
    }

    public function leRenderCallback($attributes, $content)
    {
        ob_start();
        require get_theme_file_path("/blocks/{$this->name}.php");

        return ob_get_clean();
    }

    public function onInit()
    {
        $asset_file = get_theme_file_path(
            "/build/blocks/{$this->name}.asset.php",
        );
        $asset = file_exists($asset_file)
            ? require $asset_file
            : ["dependencies" => [], "version" => false];

        wp_register_script(
            $this->name,
            get_stylesheet_directory_uri() . "/build/blocks/{$this->name}.js",
            $asset["dependencies"],
            $asset["version"],
        );
        $registerArgs = [
            "editor_script" => $this->name,
        ];
        if ($this->renderCallback) {
            $registerArgs["render_callback"] = [$this, "leRenderCallback"];
        }
        register_block_type("cns-theme/{$this->name}", $registerArgs);
    }
}

new JSXBlock("banner", true);
new JSXBlock("slideshow", true, [""]);
new JSXBlock("slide", true, [
    "themeimagepath" => get_theme_file_uri("/assets/images/"),
]);
new JSXBlock("genericbutton");
new JSXBlock("genericheading");
new JSXBlock("layouttwocol", true);
new JSXBlock("header", true);
new JSXBlock("footer", true);
new JSXBlock("infobox");
