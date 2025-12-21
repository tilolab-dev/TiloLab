<template>
    <button class="accent_btn">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    @use "@/style/mixins.scss" as mixins;

    .accent_btn {
        @include mixins.accentBtn;
    }

</style>