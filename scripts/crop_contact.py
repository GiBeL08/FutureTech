from __future__ import annotations

import os
from PIL import Image


def main() -> None:
    img_path = r"C:\Users\nurzigit\.cursor\projects\c-Users-nurzigit-Desktop-practik-next-js\assets\c__Users_nurzigit_AppData_Roaming_Cursor_User_workspaceStorage_77a90b223440c012fd0c3427d98fd60d_images_Contact_Page_-_Desktop-efb212a5-076d-4fb0-a4a2-2bab72dfe04f.png"
    img = Image.open(img_path)
    scale = 4

    out_dir = r"C:\Users\nurzigit\Desktop\practik_next_js\frontend\app\_mock_crops"
    os.makedirs(out_dir, exist_ok=True)

    w, h = img.size

    regions: dict[str, tuple[int, int, int, int]] = {
        "top_cards": (0, 0, w, int(h * 0.25)),
        "hero_left": (0, int(h * 0.22), int(w * 0.48), int(h * 0.62)),
        "form_right": (int(w * 0.40), int(h * 0.20), w, int(h * 0.62)),
        "faq": (int(w * 0.40), int(h * 0.55), w, int(h * 0.80)),
    }

    for name, box in regions.items():
        crop = img.crop(box)
        crop = crop.resize((crop.size[0] * scale, crop.size[1] * scale), Image.Resampling.LANCZOS)
        out_path = os.path.join(out_dir, f"{name}.png")
        crop.save(out_path)
        print(out_path)


if __name__ == "__main__":
    main()

