<template>
    <div class="InnerDIV">
        <pre class="TextMonoSpace">{{ MainText }}</pre>
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
                TotalText: "",  //  This is the text passed in the component's main slot.
                RefreshInterval: 1000,  //  milliseconds
                BufferIndex: 0,  //  How many characters have we written so far
                InnerDIVClasses: "",
                AreWeCurrentlyWriting: false,
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
                        this.TotalText = this.$slots.default()[0].children;
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
                console.log("UpdateText()");
                if (this.BufferIndex < this.TotalText.length)
                {
                    //  Write the next character.
                    this.MainText = this.MainText + this.TotalText[this.BufferIndex++];                    

                    //  Call this method again.
                    setTimeout(() => {
                        this.UpdateText();
                    }, this.RefreshInterval);
                }
                else
                {
                    //  End the main loop.
                    this.AreWeCurrentlyWriting = false;
                }
            },

            //  Write new content to the screen.  This can be called by the parent of the component.
            Write: function(Content)
            {
                console.log("Write()");
                this.TotalText = this.TotalText + Content;

                if (!this.AreWeCurrentlyWriting)
                {
                    //  Start the main loop again.
                    this.AreWeCurrentlyWriting = true;
                    this.UpdateText();
                }
            }
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

pre.TextMonoSpace
{
    padding: 0px;
    margin: 0px;
}

</style>
