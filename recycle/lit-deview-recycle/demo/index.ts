import { html } from "lit-element";
import { render } from "lit-html";
import "../src/LitDeviewRecycle";

const container = document.querySelector(".container");
let items = [0, 1, 2, 3];
function onAppend() {
    items = [...items, items.length];

    renderReycle();
}
function renderItem(item) {
    return html`<div class="item">${item}</div>`;
}
function renderReycle() {
    render(html`

<header>
    <p>
        DEVIEW 2019
        <br />
        Cross Framework Component
        <br />
        Lit Recycle Demo
    </p>
</header>
<div class="list">
  items:
  <span class="items" >${items.join(", ")}</span>
</div>
<lit-deview-recycle
    class="container"
    .items=${items}
    .template=${renderItem}
    .css=${html`
<style>
.item {
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #ddd;
    width: 100%;
}
</style>
    `}
    .options=${{
        margin: 5,
    }}
    @append="${onAppend}"
    >
</lit-deview-recycle>
    `, container);
}

renderReycle();
