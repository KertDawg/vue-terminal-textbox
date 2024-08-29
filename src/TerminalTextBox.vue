<template>
    <div>
        {{ MainText }}
    </div>
</template>

<script>
    export default
    {
        name: "TerminalTextBox",

        props: {
            contentClass: String,
            chromeClass: String,
        },

        data ()
        {
            return {
                MainText: "",
            };
        },

        mounted()
        {
            if (this.$slots.hasOwnProperty("default"))
            {
                if (this.$slots.default().length > 0)
                {
                    if (this.$slots.default()[0].hasOwnProperty("children") > 0)
                    {
                        this.MainText = this.$slots.default()[0].children;
                    }
                }
            }
        },
    }
</script>

<style scoped>
</style>
