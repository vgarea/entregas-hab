<template>
  <div id="burger"
       :class="{ 'active' : isOpen }"
       @click.prevent="toggle"
    >
    <slot>
      <button type="button" class="burger-button" title="Menu">
        <span class="burger-bar burger-bar--1"></span>
        <span class="burger-bar burger-bar--2"></span>
        <span class="burger-bar burger-bar--3"></span>
      </button>
    </slot>
  </div>
</template>

<script>
export default {
    name:'BurgerMenu',
    props: {
        isClose: Boolean,
    },
    data() {
        return {
            /* isOpen: false, */
        }
    },
    computed: {
        isOpen(){
            if(this.isClose === null || this.isClose === undefined){
                return false;
            }
            return this.isClose;
        }
    },
    methods: {
        toggle() {
            //this.isOpen = !this.isOpen;
            this.$emit('openmenu');
        },
    },
}
</script>

<style scoped>
/** burger **/
    button.burger-button {
        cursor: pointer;
        margin:0 0 0 2rem;
    }

    /* remove blue outline */
    button:focus {
        outline: 0;
    }

    .burger-button {
        position: relative;
        height: 30px;
        width: 32px;
        display: block;
        z-index: 60;
        border: 0;
        border-radius: 0;
        background-color: transparent;
        pointer-events: all;
        transition: transform .6s cubic-bezier(.165,.84,.44,1);
        color: var(--accent);
    }

    .burger-bar {
        background-color: var(--accent);
        position: absolute;
        top: 50%;
        right: 6px;
        left: 6px;
        height: 2px;
        width: auto;
        margin-top: -1px;
        transition: transform .6s cubic-bezier(.165,.84,.44,1),opacity .3s cubic-bezier(.165,.84,.44,1),background-color .6s cubic-bezier(.165,.84,.44,1);
    }

    .burger-bar--1 {
        -webkit-transform: translateY(-6px);
        transform: translateY(-6px);
    }

    .burger-bar--2 {
        transform-origin: 100% 50%;
        /* transform: scaleX(.8); */
    }

    .burger-button:hover .burger-bar--2 {
        transform: scaleX(1);
    }

    .no-touchevents .burger-bar--2:hover {
        transform: scaleX(1);
    }

    .burger-bar--3 {
        transform: translateY(6px);
    }

    #burger.active .burger-button {
        transform: rotate(-180deg);
    }

    #burger.active .burger-bar--1 {
        transform: rotate(45deg)
    }

    #burger.active .burger-bar--2 {
        opacity: 0;
    }

    #burger.active .burger-bar--3 {
        transform: rotate(-45deg)
    }
</style>