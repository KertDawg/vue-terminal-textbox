# vue-terminal-textbox
A component for Vue 3 that outputs text slowly like an old CRT terminal

Some instructions for making a component library are here: https://blog.logrocket.com/building-vue-3-component-library/

This is a component that looks like an old text terminal.  It prints out text slowly with a cursor.  The speed, color, and cursor type can be configured.


## Setup

For now, this is distributed a a .vue file.  This should be out into npm in the future.

1. Clone this repository.
1. Copy the `src/TerminalTextBox.vue` to your Vue 3 project's `src/components` folder.
1. Add a component to your page, either by the Vue app initialization or in the page itself:

`import TerminalTextBox from "../src/TerminalTextBox.vue";`
`Vue.component("TerminalTextBox", TerminalTextBox);`


# Use
