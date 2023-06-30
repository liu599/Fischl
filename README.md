# Project Fischl

    Fischl von Luftschloss Narfidort is a playable Electro character in Genshin Impact


An experimental project using Umijs4(React), Rust, Go to build a computationally intensive App.


## 🤘 how to use

### 🌍 For web

.

### 🏠 For local

Call workflow defined by cargo-make.

```sh
# install wasm pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# install cargo-make
cargo install --force cargo-make

# run cargo-make workflow to show dev server
cargo make --makefile Makefile.toml run-web
```

## 🔧 For developer

### Develop

Rust

```
# build all
carbo build

# build only core
cargo build -p core

# run only cli
cargo run -p cli
```

Web

```
# start web server
cd website && npm run dev

# copy wasm

wasm-pack build --target web

cp -r packages/wasm/pkg website/src/wasm
```


