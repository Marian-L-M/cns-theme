import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { mode, items } = attributes;
  return (
    <div
      {...useBlockProps.save()}
      data-wp-interactive="cns-theme/cns-header"
    >
      <nav className="cns-header__nav">
        <ul
          className={`cns-header__nav__links ${mode}`}
          data-wp-bind--aria-expanded="context.isActiveHamburger"
          data-wp-class--is-active="context.isActiveHamburger"
        >
          {items.map((item) => (
            <li key={item.id} className="cns-header__nav__item">
              <a href={item.url}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="cns-header__nav__btn-container">
          <button className="user-btn">User</button>
          <button
            className="hamburger-btn"
            data-wp-on--click="actions.toggleHamburger"
            data-wp-bind--aria-expanded="context.isActiveHamburger"
            data-wp-class--is-active="context.isActiveHamburger"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </div>
  );
}
