# Notes: block-lost-phone-ceir (niche row 10, technology)

Primary query: "how to block lost phone ceir". Researched 17 Nov 2026.

## Top results reviewed
1. inspiredBy: us.smartprix.com/bytes/sanchar-saathi-a-comprehensive-guide-on-tracking-and-blocking-lost-mobile-phones. **The WebFetch permission request timed out, so the page was not read.** I did not use curl. A sibling Smartprix page ("how to block or unblock lost phone using Know Your Mobile app or CEIR website") ranks for the same query.
2. businessinsider.in (how to block your lost or stolen phone and how to unblock it): gives the basic block and unblock steps and the document list. The portal URLs are broken ("$4" placeholders), some sentences are cut off, and it gives no source. It does not cover a lost request ID, the status page, police-filed blocks or second-hand checks.
3. techlomedia.in (CEIR guide, May 2023): lists the prerequisites, says both IMEIs are blocked, mentions KYM/14422 and unblocking. It claims "blocked within 24 hours" and "unblock within a few hours" without an official source, and it is dated.
4. sansalegal.com: covers the police complaint, duplicate SIM, documents, unblocking and buyer checks. It claims 24 to 48 hours without a source, cites no DoT documents, and does not deal with dual-SIM, a lost request ID, a new phone used without a SIM, or the can/cannot limits.
5. Telangana Today "Cyber Talk", gizbot and digit: general "lost phone" advice and older figures.

**What they all say:** FIR, duplicate SIM, IMEI, form, OTP, request ID, unblock.
**What they miss (our gap):** the form's actual mandatory fields and notes; the 18-digit request ID; the "Forgot Request ID" recovery; the status page that shows the tracing police station; that police-portal blocks (ZIPNET/CCTNS) cannot be status-checked on CEIR; the special route for a new phone never used with a SIM; the rule that the loss date must be on or after the portal launch; a clear can/cannot table (no live map, police do the tracing); current dated PIB figures; KYM checks for second-hand phones; Find Hub/Find My as complements.

## Sources per key fact
- Requirements (FIR/LR copy mandatory, re-issued SIM with SMS active for the OTP, ID proof incl. masked Aadhaar/PAN/Voter ID/DL, invoice optional, IMEI 1/IMEI 2 fields, brand/model/price, lost place/date/state/district/police station; a new phone without a SIM goes to the CEIR District Nodal police officer; loss date must be on or after the launch date): live form https://ceir.sancharsaathi.gov.in/Request/CeirUserBlockRequestDirect.jsp
- Flow (Get OTP, 18-digit request ID, block across all operators, SIM-use details shared with police, status messages, Forgot Request ID, unblock steps "Click to unblock", forwarded to operators, ZIPNET/CCTNS status limitation, KYM SMS "KYM <IMEI>" to 14422 / app / web): DoT/C-DOT CEIR user manual v02 and v03, https://ceir.sancharsaathi.gov.in/HelpDocuments/English/CEIR_Mobile_User_Manual_English_v03.pdf (also v02). The status page can show the tracing police station, district and state (v03, 2.3). The Delhi Police complaint-number format example is from v03.
- Service menu (block, unblock, check status, forgot request ID): https://sancharsaathi.gov.in/Home/ceir-services.jsp
- Figures: PIB, 5 Oct 2026 (PRID 2319087): 60.96 lakh blocked, 37.85 lakh traced, over 14 lakh recovered, app downloads over 2.8 crore (the downloads figure was cut from the final text). https://www.pib.gov.in/PressReleasePage.aspx?PRID=2319087 . The same figures appear in the DoT PDF https://www.dot.gov.in/static/uploads/2026/10/2f797eacc2f86670ba980b887dd2183c.pdf
- App features (lost/stolen blocking, handset genuineness, Chakshu, connections in your name): PIB note 2 Dec 2025, https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=156294
- Google Find Hub (play sound, mark as lost, erase, locate; needs power, internet, Google account): https://support.google.com/android/answer/6160491
- Apple (Find My, Mark as Lost, erase, go to the police, don't remove from Find My/Activation Lock): https://support.apple.com/en-in/120837

## Left out or unverifiable
- Time for a block or unblock to take effect: no official figure (competitors say 24 to 48 hours). The article says the manual gives no fixed time.
- The exact menu path on sancharsaathi.gov.in ("Citizen Centric Services"): not verified, so removed.
- The step-by-step for the Delhi Police e-lost report was not verified. The article only says many states, such as Delhi Police, allow an online lost report and that the process varies. (The CEIR manual's Delhi Police complaint-number example supports this.)
- The cloned-IMEI override list (in the manual) was cut for length.
- How to find the IMEI (*#06#, box, invoice) is general knowledge, not taken from the DoT pages.
- The "Protect data already on the phone" row in the can/cannot table is a reasonable inference (an IMEI block is network-side), not stated verbatim by DoT.
- The internal link android-ios-online-prices-difference was dropped: I could not confirm its topic (fetch blocked) and it did not fit naturally. Two internal links were used.
