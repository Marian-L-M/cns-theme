<?php
// Theme custom blocks
class JSXBlock
{
    public function __construct($name)
    {
        $this->name = $name;
        add_action("init", [$this, "onInit"]);
    }

    public function onInit()
    {
        $asset_file = get_theme_file_path("/build/{$this->name}.asset.php");
        $asset = file_exists($asset_file)
            ? require $asset_file
            : ["dependencies" => [], "version" => false];

        wp_register_script(
            $this->name,
            get_stylesheet_directory_uri() . "/build/{$this->name}.js",
            $asset["dependencies"],
            $asset["version"],
        );
        register_block_type("cns-theme/{$this->name}", [
            "editor_script" => $this->name,
        ]);
    }
}

new JSXBlock("banner");
new JSXBlock("genericbutton");
new JSXBlock("genericheading");
