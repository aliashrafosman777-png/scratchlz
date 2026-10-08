"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";

type Product = {
  id: number;
  name: string;
  type: string;
  category: "Outerwear" | "Hoodies" | "Tops" | "Pants" | "Objects";
  price: number;
  image: string;
  position?: string;
  fit?: "cover" | "contain";
  tag?: string;
  swatches: string[];
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  { id: 1, name: "Form shell 01", type: "Void black", category: "Outerwear", price: 285, image: "/brand/editorial-product-01.jpg", position: "70% center", tag: "New", swatches: ["#151517", "#5e6268", "#b6bbc0"] },
  { id: 2, name: "Void hoodie 02", type: "Washed black", category: "Hoodies", price: 190, image: "/brand/editorial-product-02.jpg", position: "72% center", tag: "Most wanted", swatches: ["#111113", "#34363b", "#777b82"] },
  { id: 3, name: "Second skin top 01", type: "Core black", category: "Tops", price: 125, image: "/brand/editorial-product-03.jpg", position: "73% center", swatches: ["#111113", "#54575d"] },
  { id: 4, name: "Form trouser 01", type: "Charcoal", category: "Pants", price: 190, image: "/brand/editorial-product-04.jpg", position: "center center", swatches: ["#202124", "#55585e"] },
  { id: 5, name: "Signal bag 01", type: "Patent black", category: "Objects", price: 240, image: "/brand/editorial-product-05.jpg", position: "72% center", tag: "Limited", swatches: ["#0e0e10", "#343438"] },
];

const menuGroups = [
  ["New arrivals", "Most wanted", "Collection 001", "Shop all"],
  ["Outerwear", "Hoodies", "Tops", "Pants"],
  ["Objects", "Accessories", "Editorial"],
];

function CatMark({ outline = false, tone = "black", className = "" }: { outline?: boolean; tone?: "black" | "white"; className?: string }) {
  const source = `/brand/cat-${tone}-${outline ? "outline" : "fill"}.png`;
  return <img className={`cat-mark ${className}`.trim()} src={source} alt="SCRATCHLZ cat-star mark" />;
}

function ArrowLink({ children, href }: { children: React.ReactNode; href: string }) {
  return <a className="arrow-link" href={href}><span>{children}</span><ArrowRight strokeWidth={1.35} /></a>;
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  const [added, setAdded] = useState(false);
  const add = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onAdd(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <div className="product-visual">
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <a className="product-link" href="#feature" aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} style={{ objectPosition: product.position, objectFit: product.fit ?? "cover" }} /></a>
        <span className="product-index">0{product.id}</span>
        <button className={`quick-add${added ? " is-added" : ""}`} onClick={add} aria-label={`Add ${product.name} to bag`}>
          {added ? <Check /> : <Plus />}
        </button>
      </div>
      <div className="product-details">
        <div><h3>{product.name}</h3><p>{product.type}</p></div>
        <strong>€{product.price}</strong>
      </div>
      <div className="swatches" aria-label="Available colors">
        {product.swatches.map((color) => <span key={color} style={{ background: color }} />)}
      </div>
    </article>
  );
}

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`menu-overlay${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="overlay-bar"><CatMark /><button onClick={onClose} aria-label="Close menu"><X /></button></div>
      <div className="menu-content">
        <p className="section-code">00 / Navigation</p>
        <div className="menu-primary">
          {menuGroups[0].map((item, index) => <a href={index < 2 ? "#new" : index === 2 ? "#systems" : "#shop"} onClick={onClose} key={item}><span>{item}</span><small>0{index + 1}</small></a>)}
        </div>
        <div className="menu-secondary">
          {menuGroups.slice(1).map((group, index) => <div key={index}>{group.map((item) => <a href={item === "Editorial" ? "#editorial" : "#shop"} onClick={onClose} key={item}>{item}<Plus /></a>)}</div>)}
        </div>
        <figure className="menu-campaign"><img src="/brand/campaign-garage.jpg" alt="SCRATCHLZ System 001 campaign in a concrete garage" /><figcaption><span>Campaign / 001</span><strong>Quiet form.<br />Sharp character.</strong></figcaption></figure>
      </div>
    </div>
  );
}

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const source = query ? products.filter((product) => `${product.name} ${product.type}`.toLowerCase().includes(query.toLowerCase())) : [products[0], products[3], products[2]];
    return source.slice(0, 3);
  }, [query]);
  const searchVisual = (product: Product) => ({ image: product.image, position: product.position });
  const suggestions = [
    { label: "Collection 001", query: "Form" },
    { label: "System outerwear", query: "Shell" },
    { label: "Technical hoodies", query: "Hoodie" },
    { label: "Steel objects", query: "Steel" },
    { label: "Wordmark pieces", query: "Wordmark" },
  ];
  return (
    <div className={`search-overlay${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="search-top"><a href="#top" onClick={onClose}>SCRATCHLZ.</a><div><span>ESC / CLOSE</span><button onClick={onClose} aria-label="Close search"><X /></button></div></div>
      <div className="search-stage">
        <h2>SEARCH</h2>
        <div className="search-controls">
          <form className="search-form" onSubmit={(event) => event.preventDefault()}>
            <Search />
            <input autoFocus={open} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search products" />
          </form>
          <div className="search-suggestions">
            <p>Browse the system</p>
            {suggestions.map((item) => <button key={item.label} onClick={() => setQuery(item.query)}>{item.label}</button>)}
          </div>
        </div>
        <div className="search-body">
          <div className="search-result-meta"><p>{query ? `${String(results.length).padStart(2, "0")} / Results` : "Selected forms"}</p>{query && <button onClick={() => setQuery("")}>Clear search</button>}</div>
          {results.length ? <div className="search-results">
            {results.map((product) => { const visual = searchVisual(product); return <a href="#shop" onClick={onClose} key={product.id}><div><img src={visual.image} alt={product.name} style={{ objectPosition: visual.position, objectFit: product.fit ?? "cover" }} /><span>0{product.id}</span></div><p>{product.name}<small>{product.type} / €{product.price}</small></p></a>; })}
          </div> : <div className="search-empty"><p>No form found.</p><button onClick={() => setQuery("")}>Return to selected forms</button></div>}
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ open, items, onClose, updateQuantity }: { open: boolean; items: CartItem[]; onClose: () => void; updateQuantity: (id: number, delta: number) => void }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className={`cart-wrap${open ? " is-open" : ""}`} aria-hidden={!open}>
      <button className="cart-scrim" onClick={onClose} aria-label="Close cart" />
      <aside className="cart-drawer">
        <div className="cart-title"><h2>Bag / {String(items.reduce((sum, item) => sum + item.quantity, 0)).padStart(2, "0")}</h2><button onClick={onClose} aria-label="Close bag"><X /></button></div>
        <div className="cart-list">
          {items.length === 0 ? <div className="empty-bag"><CatMark outline /><h3>Your system is empty.</h3><p>Add a form from Collection 001.</p><button onClick={onClose}>Continue shopping <ArrowRight /></button></div> : items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} style={{ objectPosition: item.position, objectFit: item.fit ?? "cover" }} />
              <div><span>0{item.id} / {item.type}</span><h3>{item.name}</h3><strong>€{item.price}</strong><div className="cart-quantity"><button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus /></button><b>{item.quantity}</b><button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity"><Plus /></button></div></div>
            </article>
          ))}
        </div>
        <div className="cart-summary"><p><span>Subtotal</span><strong>€{total}</strong></p><small>Taxes included. Shipping calculated at checkout.</small><button disabled={!items.length}>Checkout <ArrowRight /></button></div>
      </aside>
    </div>
  );
}

export function ScratchlzStore() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("New");
  const [toast, setToast] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const productRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (heroRef.current) heroRef.current.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.075, 38)}px`);
    };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("locked", menuOpen || searchOpen || cartOpen);
    const close = (event: KeyboardEvent) => event.key === "Escape" && (setMenuOpen(false), setSearchOpen(false), setCartOpen(false));
    window.addEventListener("keydown", close);
    return () => { document.body.classList.remove("locked"); window.removeEventListener("keydown", close); };
  }, [menuOpen, searchOpen, cartOpen]);

  const addToCart = (product: Product) => {
    setCart((items) => items.some((item) => item.id === product.id) ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, quantity: 1 }]);
    setToast(`${product.name} added`);
    window.setTimeout(() => setToast(""), 1800);
  };

  const updateQuantity = (id: number, delta: number) => setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const displayedProducts = useMemo(() => {
    return activeFilter === "New" ? products : products.filter((product) => product.category === activeFilter);
  }, [activeFilter]);
  const scrollProducts = (direction: -1 | 1) => productRailRef.current?.scrollBy({ left: direction * productRailRef.current.clientWidth * .82, behavior: "smooth" });
  const subscribe = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubscribed(true); };

  return (
    <main id="top">
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <button className="nav-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /><span>Menu</span></button>
        <a className="wordmark" href="#top">SCRATCHLZ.</a>
        <nav aria-label="Primary navigation"><a href="#new">New in</a><a href="#shop">Shop</a><a href="#systems">Collections</a><a href="#editorial">Editorial</a></nav>
        <div className="header-actions"><button onClick={() => setSearchOpen(true)} aria-label="Search"><Search /><span>Search</span></button><button className="account-button" aria-label="Account"><UserRound /><span>Account</span></button><button onClick={() => setCartOpen(true)} aria-label={`Bag with ${cartCount} items`}><ShoppingBag /><span>Bag [{cartCount}]</span></button></div>
      </header>
      <div className="hero-strip" aria-hidden="true">TØK:C-001 / 20A1 OMP</div>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} updateQuantity={updateQuantity} />

      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <div className="hero-image"><img src="/brand/hero-system-001-v2.png" alt="Model wearing SCRATCHLZ System 001 in a concrete parking structure" /></div>
        <div className="hero-panel">
          <h1 className="hero-system" id="hero-title">System 001</h1>
          <p className="hero-statement">Quiet form.<br />Sharp character.</p>
          <div className="hero-action-row"><p>Collection 001<br />2026</p><a className="hero-shop" href="#shop">Shop collection <ArrowRight /></a></div>
        </div>
        <div className="hero-wordmark" aria-hidden="true"><span className="hero-wordmark-light">SCRATCHLZ<b className="hero-dot">.</b></span><span className="hero-wordmark-dark">SCRATCHLZ<b className="hero-dot">.</b></span></div>
      </section>

      <div className="hero-transition" aria-hidden="true" />

      <section className="shop-section" id="shop">
        <div className="shop-header reveal" id="new"><h2>NEW IN</h2><hr /><a className="view-all-link" href="#systems">VIEW ALL <ArrowRight strokeWidth={1.35} /></a></div>
        <div className="product-toolbar reveal">
          <div className="product-filters">{["New", "Outerwear", "Hoodies", "Tops", "Pants", "Objects"].map((filter) => <button className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}</div>
          <div className="product-rail-actions"><span>{String(displayedProducts.length).padStart(2, "0")} / Forms</span><button onClick={() => scrollProducts(-1)} aria-label="Scroll products left"><ArrowLeft /></button><button onClick={() => scrollProducts(1)} aria-label="Scroll products right"><ArrowRight /></button></div>
        </div>
        <div className="product-grid" ref={productRailRef}>{displayedProducts.map((product) => <ProductCard product={product} onAdd={addToCart} key={product.id} />)}</div>
      </section>

      <section className="campaign-break" id="editorial">
        <div className="campaign-portrait reveal"><img src="/brand/editorial-sc1.jpg" alt="SCRATCHLZ Form Study 001 portrait with silver eyewear and a black leather jacket" /><span>Form study / 001</span></div>
        <div className="campaign-type reveal"><p className="section-code">03 / Editorial</p><h2>Form<br />study<br /><span>001</span></h2><ArrowLink href="#feature">View the study</ArrowLink></div>
        <div className="campaign-note reveal"><CatMark tone="white" /><p>Silence in shape.<br />Movement in structure.<br />Character without noise.</p><span>Shot in concrete / Cairo</span></div>
      </section>

      <section className="systems" id="systems">
        <div className="systems-head"><h2>Shop by system</h2></div>
        <div className="system-list">
          {[
            {n:"01",name:"Outerwear",img:"/brand/system-outerwear-v2.png",position:"center"},
            {n:"02",name:"Hoodies",img:"/brand/system-hoodies-v2.png",position:"center 45%"},
            {n:"03",name:"Tops",img:"/brand/system-tops-v2.png",position:"center 48%"},
            {n:"04",name:"Pants",img:"/brand/system-pants-v2.png",position:"center 62%"},
            {n:"05",name:"Objects",img:"/brand/system-objects-v2.png",position:"center 58%"},
          ].map((item) => <a className="system-row" href="#shop" key={item.n}>
            <img className="system-backdrop" src={item.img} style={{objectPosition:item.position}} alt="" />
            <span className="system-label"><b>{item.n}</b><i>/</i><strong>{item.name}</strong></span>
            <CatMark tone="white" className="system-mark" />
          </a>)}
        </div>
      </section>

      <section className="feature" id="feature">
        <div className="feature-image reveal"><img src="/brand/feature-sc3.jpg" alt="Model wearing the SCRATCHLZ Form Shell 01 black technical leather jacket" /><span>01 / Front</span><span>Form shell / Styled editorial</span></div>
        <div className="feature-info reveal">
          <p className="section-code">05 / Object focus</p><h2>Form shell<br />01</h2><p className="feature-material">Leather / Nylon<br />Void black</p><p className="feature-description">A cropped technical shell engineered around movement. Matte panels meet a structured leather body, finished with tonal hardware and the cat-star insignia.</p>
          <div className="feature-colors"><span>Colors</span><button aria-label="Void black" /><button aria-label="Steel gray" /><button aria-label="Ice blue" /></div>
          <div className="feature-sizes"><span>Size</span>{["XS", "S", "M", "L", "XL"].map((size) => <button key={size}>{size}</button>)}</div>
          <div className="feature-buy"><strong>€285</strong><button onClick={() => addToCart(products[0])}>Add to bag <ArrowRight /></button></div>
          {[["Details","Structured fit / Technical panel construction"],["Material","Recycled nylon / Technical leather"],["Delivery","Worldwide tracked shipping"]].map(([title, text]) => <details key={title}><summary>{title}<ChevronDown /></summary><p>{text}</p></details>)}
        </div>
      </section>

      <footer id="footer" className="site-footer">
        <div className="footer-top">
          <section className="footer-newsletter" aria-labelledby="footer-newsletter-title">
            <h2 id="footer-newsletter-title">Newsletter | subscribe &amp; stay in the loop</h2>
            <p>Receive news about SCRATCHLZ collections, restocks, editorials and releases.</p>
            {subscribed ? <div className="footer-success"><Check /><span>You’re on the list. Collection 002 will find you first.</span></div> : <form onSubmit={subscribe}>
              <label><span className="sr-only">Email address</span><input type="email" placeholder="Enter your email address" required /></label>
              <button type="submit"><ArrowRight /><span>Sign up and get 10% off</span></button>
              <small>By subscribing you agree to receive commercial communications from SCRATCHLZ by email.<br />See our <a href="#top">Privacy Policy</a>.</small>
            </form>}
          </section>

          <nav className="footer-links" aria-label="Footer navigation">
            <div><h3>Contact us <sup>3</sup></h3><a href="#top">Contact</a><a href="#top">FAQS</a><a href="#top">Live chat</a></div>
            <div><h3>Client Services <sup>3</sup></h3><a href="#top">My account</a><a href="#top">Track your order</a><a href="#top">Make a return</a></div>
            <div><h3>Company <sup>6</sup></h3><a href="#top">Returns &amp; exchanges</a><a href="#top">Privacy policy</a><a href="#top">Shipping policy</a><a href="#top">Terms &amp; conditions</a><a href="#top">Careers</a><a href="#top">Stores</a></div>
            <div><h3>Social <sup>3</sup></h3><a href="#top">Instagram</a><a href="#top">Tiktok</a><a href="#top">Youtube</a></div>
          </nav>
        </div>

        <img className="footer-wordmark" src="/brand/footer-wordmark.jpg" alt="" aria-hidden="true" loading="lazy" />
        <div className="footer-bottom"><p>SCRATCHLZ ® EVERYDAY FORM / SHARP CHARACTER</p><img src="/brand/footer-outline.png" alt="SCRATCHLZ cat-star mark" className="footer-cat" loading="lazy" /></div>
      </footer>

      <div className={`toast${toast ? " is-visible" : ""}`} role="status"><Check />{toast}</div>
    </main>
  );
}
