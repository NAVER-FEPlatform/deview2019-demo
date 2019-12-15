import { html } from "lit-element";
import { render } from "lit-html";
import "../src/LitDeviewInfinite";

const container = document.querySelector(".container");
let items = [0, 1, 2, 3];
function onAppend() {
    items = [...items, items.length];

    renderInfinite();
}
function renderItem(item) {
    return html`<div>${item}</div>`;
}
function renderInfinite() {
    render(html`
        <lit-deview-infinite
            .items=${items}
            .template=${renderItem}
            @append="${onAppend}"
            />
    `, container);
}

renderInfinite();
