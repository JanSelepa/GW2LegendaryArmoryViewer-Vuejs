<script setup>
import { ref, onMounted } from 'vue';

defineEmits(["close"]);
const props = defineProps({
    title: String,
});

const focusTarget = ref(null);

const bgColor = window.getComputedStyle(document.documentElement)["backgroundColor"];

onMounted(() => {
    if (focusTarget.value) {
        focusTarget.value.focus();
    }
});

</script>

<template>
    <div class="dialog" @keyup.esc="$emit('close')" tabindex="-1" ref="focusTarget">
        <div class="window" :style="{ backgroundColor: bgColor }">
            <div class="header">
                <div class="title">{{ props.title }}</div>
                <div class="close" @click="$emit('close')">
                    <i class="fa fa-times"></i>
                </div>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dialog {
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #00000088;
    display: flex;
    justify-content: center;
    align-items: center;
}
.dialog:focus{
    outline: none;
}
.window {
    border: solid;
    border-radius: 0.5rem;
    border-width: 0.1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.header {
    background-color: #88888844;
    display: flex;
    flex-direction: row;
}
.title {
    flex: 1;
    margin: 0.5rem 1rem;
    font-size: 1.2rem;
    font-weight: bold;
}
.close {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 1rem;
}
.close:hover {
    background-color: red;
    color: white;
}
.content {
    padding: 1rem;
    max-width: 40rem;
}
</style>
