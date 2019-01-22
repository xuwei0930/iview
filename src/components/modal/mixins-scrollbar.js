// used for Modal & $Spin & Drawer
import { getScrollBarSize } from '../../utils/assist';
export default {
    methods: {
        checkScrollBar () {
            let fullWindowWidth = window.innerWidth;
            if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
                const documentElementRect = document.documentElement.getBoundingClientRect();
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
            }
            this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
            if (this.bodyIsOverflowing) {
                this.scrollBarWidth = getScrollBarSize();
            }
        },
        checkMaskInVisible () {
            //抽屉也是共用的所以要加上抽屉上再弹modal的兼容，否则在抽屉上关闭modal会出现滚动条
            let masks = document.querySelectorAll('.ivu-modal-mask,.ivu-drawer-mask') || [];
            return Array.from(masks).every(m => m.style.display === 'none' || m.classList.contains('fade-leave-to'));
        },
        setScrollBar () {
            if (this.bodyIsOverflowing && this.scrollBarWidth !== undefined) {
                document.body.style.paddingRight = `${this.scrollBarWidth}px`;
            }
        },
        resetScrollBar () {
            document.body.style.paddingRight = '';
        },
        addScrollEffect () {
            this.checkScrollBar();
            this.setScrollBar();
            document.body.style.overflow = 'hidden';
        },
        removeScrollEffect() {
            if (this.checkMaskInVisible()) {
                document.body.style.overflow = '';
                this.resetScrollBar();
            }
        }
    }
};
