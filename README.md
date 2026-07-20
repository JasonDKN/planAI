# Our Wedding Planner Site

A simple, fully customizable wedding-planning website built with **TypeScript, HTML, and CSS** — no frameworks, no complicated build tools to run yourself. You edit one file, push to GitHub, and GitHub automatically builds and publishes the site for you.

Live example of what it shows once published: a countdown to the wedding, an "At a Glance" panel of key facts, a photo gallery, and a full chronological planning checklist people can check off (with filters, a progress bar, and a way for anyone visiting to jot down their own personal to-dos).

## 1. What's in this project

```
index.html               The page structure (you rarely need to touch this)
style.css                 Colors, fonts, spacing (edit hex colors here if you want a new look)
src/config.ts              <-- THE FILE YOU EDIT. All your wedding details & checklist live here.
src/app.ts                  The logic that draws the page (you shouldn't need to touch this)
media/                        Put your own photos here (e.g. media/engagement.jpg)
.github/workflows/deploy.yml   Tells GitHub to auto-build & publish the site on every push
package.json / tsconfig.json     Build configuration (you don't need to understand these)
```

You almost never need to open anything except **`src/config.ts`**. Open it in any text editor (even GitHub's own web editor — see below) and you'll find clearly labeled sections:

1. `WEDDING_DATE` — the date/time everything counts down to.
2. `COUPLE` — names, tagline, hero photo, hashtag.
3. `CUSTOM_VARIABLES` — any list of facts you want shown on the site ("Budget", "Venue", "Guest Count"...). Add or delete rows freely.
4. `MEDIA_GALLERY` — photos to display in the gallery.
5. `CATEGORIES` — the checklist's category names & colors.
6. `TIMELINE_TASKS` — the full task list. Edit dates/titles, delete what doesn't apply, or copy a line to add a new task.

Every item in those lists follows the same `{ ... }` pattern — to add a new one, copy an existing line just above or below it, paste it, and change the text inside the quotes. Don't forget the comma at the end of each line (except sometimes the very last one).

## 2. One-time setup: get this onto GitHub

If you've never used GitHub or git before, do this once:

1. **Create a GitHub account** at [github.com](https://github.com) if you don't have one.
2. **Create a new repository**: click the `+` in the top right → "New repository" → give it a name like `our-wedding` → keep it "Public" (required for free GitHub Pages) → click "Create repository". Don't add a README/gitignore in that dialog — you already have them here.
3. **Upload these files**: on your new repo's page, click "uploading an existing file" (or drag-and-drop). Select every file/folder in this project and upload them. GitHub will let you write a commit message — something like "Initial wedding site" — then click "Commit changes".
   - Alternative (if you're comfortable installing [git](https://git-scm.com/downloads) and a terminal): from inside this folder, run:
     ```
     git init
     git add -A
     git commit -m "Initial wedding site"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
     git push -u origin main
     ```
4. **Turn on GitHub Pages with Actions**: on your repo page, go to **Settings → Pages**. Under "Build and deployment" → "Source", choose **GitHub Actions**. That's it — no other settings needed.
5. **Wait about a minute**, then go to the **Actions** tab of your repo. You should see a workflow run (green checkmark = success). Once it's green, go back to **Settings → Pages** and you'll see your live site URL at the top (something like `https://YOUR-USERNAME.github.io/YOUR-REPO/`).

From now on, **every time you push a change, the site rebuilds and republishes automatically** — you never have to run a build command yourself.

## 3. Making changes later (the normal workflow)

1. Open `src/config.ts` — either by editing the file on your computer, or directly on GitHub (open the file in your repo, click the pencil ✏️ icon to edit in the browser).
2. Change whatever you want: dates, names, add a task, add a photo URL, update a custom variable.
3. Save / commit:
   - **On GitHub's web editor**: scroll down, write a short commit message ("Booked the venue!"), click "Commit changes" directly to `main`.
   - **On your own computer with git**:
     ```
     git add -A
     git commit -m "Booked the venue!"
     git push
     ```
4. Check the **Actions** tab — within a minute or two you'll see a new run finish, and your live site will show the update.

You genuinely don't need to know TypeScript to do this. The type labels (things like `: string`) in `config.ts` are just safety hints for anyone using an editor like VS Code — you can ignore them and just edit the text inside quotes.

## 4. Adding your own photos

Drop image files (`.jpg`, `.png`) into the `media/` folder, then reference them in `src/config.ts` like:

```ts
{ url: "media/engagement-1.jpg", caption: "Engagement photo, Spring 2026" }
```

You can also just paste a full web link (`https://...`) instead of using the `media/` folder — either works.

## 5. Previewing changes before you push (optional)

You don't have to do this — you can just push and let GitHub build it. But if you want to preview locally first and have [Node.js](https://nodejs.org) installed:

```
npm install
npm run build
```

This compiles `src/*.ts` into `site/*.js`. Then copy `index.html` and `style.css` into that same `site/` folder and open `site/index.html` in your browser.

## 6. How the checklist "remembers" what's checked off

Checkmarks and any personal tasks you add through the "+ Add your own task" box are saved in **that specific browser**, using a feature called `localStorage`. That means:

- If you check something off on your laptop, it stays checked next time you visit on that same laptop/browser.
- It will **not** show as checked for your partner on their phone, or for guests visiting the site — checkmarks are private per-device.
- If you want a task to be permanent and visible to everyone (not just you), add it to `TIMELINE_TASKS` in `src/config.ts` and push it, instead of using the "+ Add your own task" box.

## 7. Troubleshooting

- **The Actions tab shows a red ❌**: click into the failed run to read the error. The most common cause is a typo in `src/config.ts` (e.g. a missing comma or quote mark). Compare the line the error points to with the lines around it.
- **Pages settings won't let you pick "GitHub Actions" as the source**: make sure the repository is Public (Settings → General → scroll to "Danger Zone" if you need to change visibility), since free GitHub accounts require public repos for Pages.
- **Nothing shows up on the live site**: give it a minute or two after a green Actions run, then hard-refresh the page (Ctrl/Cmd+Shift+R).
