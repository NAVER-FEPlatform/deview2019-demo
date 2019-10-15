import VanillaRecycle, { RecycleOptions } from '@egjs/deview-recycle';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CreateElement, VNodeData, VNode } from 'vue';



@Component({})
export default class DeviewRecycle extends Vue {
    @Prop({ type: String, default: 'div', required: false }) public tag!: string;
    @Prop({ type: String, default: '', required: false }) public className!: string;
    @Prop({ type: Object, default: () => ({}), required: false }) public options!: Partial<RecycleOptions>;

    private recycle!: VanillaRecycle;
    public render(h: CreateElement) {
        const containerData: VNodeData = {
            class: {},
        };
        if (this.className) {
            containerData.class[this.className] = true;
        }
        const slots = this.$slots.default || [];
        const slotKeys = slots.map((slot: VNode) => slot.key);

        let visisbleSlots: VNode[] = [];

        if (this.recycle) {
            this.recycle.beforeSync(slotKeys);
            const indexes = this.recycle.getRenderingIndexes();
            visisbleSlots = slots.slice(indexes.start, indexes.end + 1);
        }

        return h(this.tag, containerData, visisbleSlots);
    }
    public mounted() {
        this.recycle = new VanillaRecycle(this.$el as HTMLElement, {
            ...this.options,
            renderExternal: true,
        }).on('append', (e: any) => {
            this.$emit('append', { ...e, currentTarget: this });
        }).on('visibleChange', (e: any) => {
            this.$emit('visibleChange', { ...e, currentTarget: this });
            this.$forceUpdate();
        });

        const recycle = this.recycle;

        recycle.sync([].slice.call(this.$el.children));
    }
    public updated() {
        this.recycle.sync([].slice.call(this.$el.children));
    }
    public beforeDestroy() {
        this.recycle.destroy();
    }
}
