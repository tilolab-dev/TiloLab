<template>
    <button class="transparent_btn">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    @use "@/style/mixins.scss" as mixins;

    .transparent_btn {
        @include mixins.transparentBtn;
    }

</style>