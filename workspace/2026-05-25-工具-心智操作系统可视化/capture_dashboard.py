import os
from playwright.sync_api import sync_playwright

def take_screenshot():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 900})
        
        # Get absolute path for the local file
        file_path = "file://" + os.path.abspath("MentalOS_Dashboard.html")
        
        page.goto(file_path)
        # Wait for the dots and React to render
        page.wait_for_timeout(2000) 
        
        page.screenshot(path="MentalOS_Preview.png", full_page=True)
        print(f"Screenshot saved to MentalOS_Preview.png")
        
        browser.close()

if __name__ == "__main__":
    take_screenshot()
