<template>
    <div class="InnerDIV">
        {{ MainText }}
    </div>
</template>

<script>
    export default
    {
        name: "TerminalTextBox",

        props: {
            contentClass: {
                type: String,
                default: "",
            },
            chromeClass: {
                type: String,
                default: "",
            },
            speed: {
                type: Number,
                default: 10,
            },
            showCursor: {
                type: Boolean,
                default: true,
            },
        },

        data ()
        {
            return {
                MainText: "",
                SlotText: "",  //  This is the text passed in the component's main slot.
                RefreshInterval: 1000,  //  milliseconds
                BufferIndex: 0,  //  How many characters have we written so far
                InnerDIVClasses: "",
            };
        },

        mounted()
        {
            //  What text should we show?
            if (this.$slots.hasOwnProperty("default"))
            {
                if (this.$slots.default().length > 0)
                {
                    if (this.$slots.default()[0].hasOwnProperty("children") > 0)
                    {
                        this.SlotText = this.$slots.default()[0].children;
                    }
                }
            }

            //  Get the timer interval from the speed slot.
            this.RefreshInterval = 1000 / this.speed;

            //  Set the content classes.
            this.InnerDIVClasses = "InnerDIV " + this.contentClass;

            //  Start the main loop.
            this.UpdateText();
        },

        methods:
        {
            UpdateText: function()
            {
                if (this.BufferIndex < this.SlotText.length)
                {
                    //  Write the next character.
                    this.MainText = this.MainText + this.SlotText[this.BufferIndex++];                    

                    //  Call this method again.
                    setTimeout(() => {
                        this.UpdateText();
                    }, this.RefreshInterval);
                }
            },
        },
    }
</script>

<style>

div.InnerDIV
{
    font-family: 'Courier New', Courier, monospace;
    background-color: #000000;
    color: #7f7f7f;
    width: 100%;
    height: 100%;
}

</style>
