from playwright.sync_api import sync_playwright

def verify_daily_checklist():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        print("Navigating to http://localhost:5500")
        page.goto("http://localhost:5500")

        # Wait for the page to load and the "Daily Deeds" section to be visible
        # "দৈনিক আমল" is the Bengali text for "Daily Deeds"
        print("Waiting for 'দৈনিক আমল' text...")
        page.get_by_text("দৈনিক আমল").wait_for()

        # Take a screenshot of the whole page first
        print("Taking screenshot of the page...")
        page.screenshot(path="verification_page.png", full_page=True)

        # Take a screenshot specifically of the checklist area if possible
        # The checklist is likely following the h3 with "দৈনিক আমল"
        # We can try to locate the container.
        # The container has class "space-y-4" and contains the header and the checklist.

        # Let's try to locate one of the checklist items to confirm they are rendered as expected.
        # We know some item names from activities.js, e.g., "জামাতের সাথে (আওয়াল ওয়াক্তে) সালাত"
        # or "Salah with Jamat" if it's in English (but the code uses Bengali names).

        # Let's locate the first item "জামাতের সাথে (আওয়াল ওয়াক্তে) সালাত"
        # Wait, the activities are sorted. "jamat_salah" is likely first.
        # Let's just take a screenshot of the relevant section.

        print("Taking screenshot of the checklist area...")
        # Locate the h3 and the following sibling div which contains the list
        # Since structure might be nested, let's just grab the parent container of the h3
        header = page.get_by_text("দৈনিক আমল")
        parent = header.locator("..")
        parent.screenshot(path="verification_checklist.png")

        browser.close()
        print("Verification complete.")

if __name__ == "__main__":
    verify_daily_checklist()
