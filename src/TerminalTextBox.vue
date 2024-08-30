<template>
    <div class="InnerDIV">
        <canvas id="TextArea"></canvas>
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
        lineCursor: {
            type: Boolean,
            default: false,
        },
    },

    data ()
    {
        return {
            MainText: "",  //  This is the text passed in the component's main slot.  Then, it gets added to by Write().
            Lines: [],
            RefreshInterval: 1000,  //  milliseconds
            BufferIndex: 0,  //  How many characters have we written so far
            InnerDIVClasses: "",
            AreWeCurrentlyWriting: false,
            TextArea: null,
            CanvasWidth: 0,
            CanvasHeight: 0,
            LineHeight: 24,
            CharacterWidth: 12,
            CurrentLineNumber: 0,
            CurrentCharacterInLine: 0,
            CursorX: 0,
            CursorY: 0,
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
                    this.MainText = this.$slots.default()[0].children;
                }
            }
        }

        //  Get the elements.
        this.TextArea = document.getElementById("TextArea").getContext("2d");
        this.CanvasWidth = this.TextArea.width;
        this.CanvasHeight = this.TextArea.height;

        //  Get the timer interval from the speed slot.
        this.RefreshInterval = 1000 / this.speed;

        //  Set the content classes.
        this.InnerDIVClasses = "InnerDIV " + this.contentClass;
    },

    methods:
    {
        MainLoop: function()
        {
            this.Lines = this.MainText.split("\n");
            this.DrawText();

            if (this.AreWeCurrentlyWriting)
            {
                //  Call this method again.
                setTimeout(() => {
                    this.MainLoop();
                }, this.RefreshInterval);
            }
        },
        
        DrawText: function()
        {
            this.Lines = this.MainText.split("\n")

            for (var LocalCurrentLineNumber = this.CurrentLineNumber; (LocalCurrentLineNumber < this.Lines.length) && (LocalCurrentLineNumber < this.Lines.length); LocalCurrentLineNumber++)
            {
                var Line = this.Lines[LocalCurrentLineNumber];

                if (this.CurrentCharacterInLine >= Line.length)
                {
                    this.CurrentLineNumber++;
                    this.CurrentCharacterInLine - 0;
                    return;
                }
                else
                {
                    for (var LocalCharacterInLineIndex = this.CurrentCharacterInLine; LocalCharacterInLineIndex < Line.length; LocalCharacterInLineIndex++)
                    {
                        var CharacterX = this.CharacterWidth * (LocalCharacterInLineIndex + 1);
                        var CharacterY = this.LineHeight * (LocalCurrentLineNumber + 1);
                        this.DrawCursor(CharacterX + this.CharacterWidth, CharacterY);
                        this.TextArea.fillStyle = "grey";
                        this.TextArea.font = "24px monospace";
                        this.TextArea.fillText(Line[LocalCharacterInLineIndex], CharacterX, CharacterY);
                        this.CurrentCharacterInLine++;

                        //  Is this the last character in a line?
                        if (this.CurrentCharacterInLine >= Line.length)
                        {
                            this.CurrentLineNumber++;
                            this.CurrentCharacterInLine = 0;
                            return;
                        }

                        return;
                    }
                }
            }

            this.CurrentLineNumber--;
            this.AreWeCurrentlyWriting = false;
        },

        //  Write new content to the screen.  This can be called by the parent of the component.
        Write: function(Content)
        {
            this.MainText = this.MainText + Content;

            if (!this.AreWeCurrentlyWriting)
            {
                //  Start the main loop again.
                this.AreWeCurrentlyWriting = true;
                this.MainLoop();
            }
        },

        DrawCursor: function(x, y)
        {
            var LeftX = x + 2;
            var Width = this.CharacterWidth - 2;
            var TopY = y - this.LineHeight + 2;
            var Height = this.LineHeight;

            if (this.lineCursor)
            {
                //  Underline cursor
                Height = 4;
                TopY = TopY + this.LineHeight - Height;
            }

            //  Erase the old cursor.
            this.TextArea.fillStyle = "black";
            this.TextArea.fillRect(this.CursorX, this.CursorY, Width, Height);

            //  Draw the cursor.
            this.TextArea.fillStyle = "grey";
            this.TextArea.fillRect(LeftX, TopY, Width, Height);

            //  Save the cursor position to erase next time.
            this.CursorX = LeftX;
            this.CursorY = TopY;
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

canvas.TextArea
{
    padding: 0px;
    margin: 0px;
}

</style>
