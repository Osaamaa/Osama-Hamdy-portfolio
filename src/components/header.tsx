"use client";

import { useRef, type KeyboardEvent } from "react";
import { navigation } from "@/content/portfolio";
import { Icon } from "@/components/ui";

export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  function closeMenu() { dialog.current?.close(); }
  function keepFocusInMenu(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = dialog.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }
  function href(id: string) { return `/#${id}`; }

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" aria-label="Osama Hamdy — home" className="wordmark"><span className="monogram" aria-hidden="true">oh<span>.</span></span><span>Osama Hamdy</span></a>
        <nav aria-label="Main navigation" className="desktop-nav">{navigation.map(item => <a key={item.id} href={href(item.id)}>{item.label}</a>)}</nav>
        <a href={href("contact")} className="header-cta">Let’s connect<Icon name="northeast" /></a>
        <button ref={trigger} className="menu-trigger" aria-label="Open navigation menu" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><span /><span /></button>
      </div>
    </header>
    <dialog ref={dialog} className="mobile-dialog" aria-labelledby="mobile-menu-title" onKeyDown={keepFocusInMenu} onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === dialog.current) closeMenu(); }}>
      <div className="mobile-menu-panel">
        <div className="mobile-menu-top"><span id="mobile-menu-title" className="eyebrow">Find your way</span><button onClick={closeMenu} aria-label="Close navigation menu" className="menu-close">×</button></div>
        <nav aria-label="Mobile navigation">{navigation.map((item, index) => <a key={item.id} href={href(item.id)} onClick={closeMenu}><span className="menu-index">0{index + 1}</span>{item.label}<Icon name="northeast" /></a>)}</nav>
        <p className="mobile-menu-note">Osama Hamdy<br />Software Engineer & Product Builder</p>
      </div>
    </dialog>
  </>;
}
