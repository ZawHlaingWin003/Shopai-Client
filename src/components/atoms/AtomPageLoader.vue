<template>
    <div class="loading" v-if="!isloaded">
        <div class="custom-loader"></div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            isloaded: false,
        };
    },
    mounted() {
        document.onreadystatechange = () => {
            if (document.readyState == "complete") {
                this.isloaded = true;
            }
        };
    },
};
</script>

<style scoped>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2f3142;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-loader {
    width: 100px;
    height: 100px;
    display: grid;
    color: #525298;
    background: radial-gradient(
        farthest-side,
        currentColor calc(100% - 12px),
        #0000 calc(100% - 10px) 0
    );
    -webkit-mask: radial-gradient(
        farthest-side,
        #0000 calc(100% - 26px),
        #000 calc(100% - 24px)
    );
    border-radius: 50%;
    animation: s9 2s infinite linear;
}
.custom-loader::before,
.custom-loader::after {
    content: "";
    grid-area: 1/1;
    background: linear-gradient(currentColor 0 0) center,
        linear-gradient(currentColor 0 0) center;
    background-size: 100% 20px, 20px 100%;
    background-repeat: no-repeat;
}
.custom-loader::after {
    transform: rotate(45deg);
}

@keyframes s9 {
    100% {
        transform: rotate(1turn);
    }
}
</style>