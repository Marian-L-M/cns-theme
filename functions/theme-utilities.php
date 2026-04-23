<?php
function cns_generate_style_text( array $props ): string {
    $declarations = [];
    foreach ( $props as $property => $value ) {
        if ( $value !== '' && $value !== null ) {
            $declarations[] = esc_attr( $property ) . ':' . esc_attr( $value );
        }
    }
    return implode( ';', $declarations );
}
