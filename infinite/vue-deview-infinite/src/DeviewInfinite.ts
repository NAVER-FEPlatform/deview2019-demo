import VanillaInfinite, { InfiniteOptions } from '@egjs/deview-infinite';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CreateElement, VNodeData } from 'vue';



@Component({})
export default class DeviewInfinite extends Vue {
    @Prop({ type: String, default: 'div', required: false }) public tag!: string;
    @Prop({ type: String, default: '', required: false }) public className!: string;
    @Prop({ type: Object, default: () => ({}), required: false }) public options!: Partial<InfiniteOptions>;

    private infinite!: VanillaInfinite;
    public render(h: CreateElement) {
        const containerData: VNodeData = {
          class: {},
        };
        if (this.className) {
            containerData.class[this.className] = true;
        }
        return h(this.tag, containerData, this.$slots.default);
      }
    public mounted() {
        this.infinite = new VanillaInfinite(this.$el as HTMLElement, {
            ...this.options,
            renderExternal: true,
        }).on('append', (e: any) => {
            this.$emit('append', { ...e, currentTarget: this });
        });

        const infinite = this.infinite;

        infinite.sync([].slice.call(this.$el.children));
    }
    public updated() {
        this.infinite.sync([].slice.call(this.$el.children));
    }
    public beforeDestroy() {
        this.infinite.destroy();
    }
}
