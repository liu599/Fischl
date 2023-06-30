mod utils;

use std::process::Command;
use wasm_bindgen::prelude::*;

use core::exec;
use wasm_bindgen::Clamped;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, mona!");
}

#[wasm_bindgen]
pub fn get_greeting(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[wasm_bindgen]
pub fn call_command(command: &str) -> Result<String, JsValue> {
    let output = Command::new("cmd")
        .args(&["/C", command])
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;

    if output.status.success() {
        let result = String::from_utf8_lossy(&output.stdout).into_owned();
        Ok(result)
    } else {
        let error = String::from_utf8_lossy(&output.stderr).into_owned();
        Err(JsValue::from_str(&error))
    }
}

#[wasm_bindgen]
pub fn execute_windows_application() {
    let output = Command::new("echo")
        .arg("Hello, World!")
        .output()
        .expect("Failed to execute command");

    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        println!("Command executed successfully:");
        println!("{}", stdout);
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        println!("Command failed:");
        println!("{}", stderr);
    }
}

#[wasm_bindgen]
pub fn exec_mosaic(buf: Clamped<Vec<u8>>, grain: u32, width: u32, height: u32) -> Vec<u8> {
    exec(buf.0, grain, width, height)
}
