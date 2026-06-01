# MMIRE Website
## mymateinrealestate.com.au · mmire.com.au

### Stack
- Node.js + Express (`server.js`)
- Resend (email notifications — no Supabase in this version)
- Railway (hosting)
- Static HTML — no build step

---

### File structure

```
/
├── server.js             ← Express server (entry point)
├── package.json
├── README.md
└── public/
    ├── index.html        ← Owner-facing homepage (/)
    ├── mates.html        ← Agent/broker/PM registration (/mates)
    ├── referrers.html    ← Platform partner pitch (/referrers)
    ├── thankyou.html     ← Shared thank-you page (/thankyou?type=mate|referrer)
    ├── privacy.html      ← Privacy policy (/privacy)
    └── robots.txt
```

---

### How the thank-you page works

`/thankyou` is a single page that switches content based on URL params.

Both `mates.html` and `referrers.html` redirect here on form submit, carrying:

| Param     | Source           |
|-----------|-----------------|
| `type`    | `mate` or `referrer` |
| `name`    | Contact name    |
| `email`   | Email address   |
| `phone`   | Phone number    |
| `area`    | Area (Mates)    |
| `company` | Company (Referrers) |

The page builds the referrer.com.au/signup URL with these params pre-filled — so the user lands on signup already populated.

**Video placeholder:** the "Wait for our call" card contains a video placeholder (16:9 aspect ratio, dashed border). When the HeyGen walkthrough is ready, swap in an `<iframe>` or `<video>` tag in `thankyou.html` where `videoPlaceholder` is defined.

---

### Setup

**1. Resend**
- Create account at resend.com
- Add and verify domain: mymateinrealestate.com.au
- Create API key
- Add sending address: notifications@mymateinrealestate.com.au

**2. Railway**
- Create new Railway project, connect GitHub repo
- Set environment variables:
  ```
  RESEND_API_KEY=re_...
  NOTIFY_EMAIL=rick@mymateinrealestate.com.au
  PORT=3000
  ```
- Railway auto-deploys on push to main

**3. Domains**
- Point `mymateinrealestate.com.au` → Railway deployment
- Point `mmire.com.au` → same Railway deployment

---

### API endpoints

| Method | Path                    | Action                         |
|--------|-------------------------|-------------------------------|
| POST   | `/api/find-mate`        | Owner request → Resend notify  |
| POST   | `/api/mates-register`   | Agent EOI → Resend notify      |
| POST   | `/api/referrers-register` | Partner reg → Resend notify  |

All three: notify Rick by email, return `{ success: true }`.  
Client-side JS then redirects to `/thankyou?...` with params.

---

### Reviewing registrations

No database in this version. All registrations arrive as Resend email notifications to `NOTIFY_EMAIL`.

Inbox labels:
- 🏠 Owner request
- ⭐ Mate expression of interest
- 🚀 Platform partner registration (priority)

---

### Future additions
- Supabase: add tables `mate_requests`, `mates_interest`, `referrer_interest` and write to DB in addition to email
- Resend confirmation email to registrant (requires verified domain sending)
- Suburb → LGA mapping for Mate matching
- referrer.com.au API integration for automatic lead routing
"# mymateinrealestate.com.au" 
