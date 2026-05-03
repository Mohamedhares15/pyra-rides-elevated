# Route Mapping (Elevated → Next.js App Router)

| Elevated route file | Next.js page | Component |
|---|---|---|
| `routes/index.tsx` | `app/page.tsx` | `Index` |
| `routes/about.tsx` | `app/about/page.tsx` | `About` |
| `routes/booking.tsx` | `app/booking/page.tsx` | `Booking` |
| `routes/chat.tsx` | `app/chat/page.tsx` | `Chat` |
| `routes/contact.tsx` | `app/contact/page.tsx` | `Contact` |
| `routes/faq.tsx` | `app/faq/page.tsx` | `FAQ` |
| `routes/gallery.tsx` | `app/gallery/page.tsx` | `Gallery` |
| `routes/leaderboard.tsx` | `app/leaderboard/page.tsx` | `Leaderboard` |
| `routes/offline.tsx` | `app/offline/page.tsx` | `Offline` |
| `routes/packages.index.tsx` | `app/packages/page.tsx` | `Packages` |
| `routes/packages.$id.tsx` | `app/packages/[id]/page.tsx` | `PackageDetail` |
| `routes/pricing.tsx` | `app/pricing/page.tsx` | `Pricing` |
| `routes/privacy.tsx` | `app/privacy/page.tsx` | `Legal` |
| `routes/refund-policy.tsx` | `app/refund-policy/page.tsx` | `Legal` |
| `routes/signin.tsx` | `app/signin/page.tsx` | `SignIn` |
| `routes/signup.tsx` | `app/signup/page.tsx` | `SignUp` |
| `routes/forgot-password.tsx` | `app/forgot-password/page.tsx` | `ForgotPassword` |
| `routes/reset-password.tsx` | `app/reset-password/page.tsx` | `ResetPassword` |
| `routes/terms.tsx` | `app/terms/page.tsx` | `Legal` |
| `routes/training.index.tsx` | `app/training/page.tsx` | `Training` |
| `routes/training.$academyId.index.tsx` | `app/training/[academyId]/page.tsx` | `AcademyDetail` |
| `routes/training.$academyId.checkout.tsx` | `app/training/[academyId]/checkout/page.tsx` | `TrainingCheckout` |
| `routes/training.checkout.tsx` | `app/training/checkout/page.tsx` | `TrainingDirectCheckout` |
| `routes/checkout.index.tsx` | `app/checkout/page.tsx` | `Checkout` |
| `routes/checkout.package.$id.tsx` | `app/checkout/package/[id]/page.tsx` | `CheckoutPackage` |
| `routes/payment.success.tsx` | `app/payment/success/page.tsx` | `PaymentSuccess` |
| `routes/payment.cancel.tsx` | `app/payment/cancel/page.tsx` | `PaymentCancel` |
| `routes/stables.index.tsx` | `app/stables/page.tsx` | `Stables` |
| `routes/stables.$id.tsx` | `app/stables/[id]/page.tsx` | `StableDetail` |
| `routes/s.$stableId.tsx` | `app/s/[stableId]/page.tsx` | `StableDetail` |
| `routes/users.$id.tsx` | `app/users/[id]/page.tsx` | `RiderProfile` |
| `routes/reviews.tsx` | `app/reviews/page.tsx` | `Reviews` |
| `routes/cercle.tsx` | `app/cercle/page.tsx` | `Cercle` |
| `routes/auth.switch.tsx` | `app/auth/switch/page.tsx` | `DevSwitch` |
| `routes/__root.tsx` | `app/layout.tsx` | `RootLayout` |
| `routes/admin.index.tsx` | `app/admin/page.tsx` | `Admin` |
| `routes/admin.horses.tsx` | `app/admin/horses/page.tsx` | `AdminHorses` |
| `routes/admin.analytics.tsx` | `app/admin/analytics/page.tsx` | `AdminAnalytics` |
| `routes/admin.schedule.tsx` | `app/admin/schedule/page.tsx` | `AdminSchedule` |
| `routes/admin.upload-horses.tsx` | `app/admin/upload-horses/page.tsx` | `AdminHorses` |
| `routes/dashboard.index.tsx` | `app/dashboard/page.tsx` | `DashboardRouter` |
| `routes/dashboard.loyalty.tsx` | `app/dashboard/loyalty/page.tsx` | `DashboardLoyalty` |
| `routes/dashboard.analytics.tsx` | `app/dashboard/analytics/page.tsx` | `AdminAnalytics` |
| `routes/dashboard.rider.tsx` | `app/dashboard/rider/page.tsx` | `RiderDashboard` |
| `routes/dashboard.captain.tsx` | `app/dashboard/captain/page.tsx` | `CaptainDashboard` |
| `routes/dashboard.driver.index.tsx` | `app/dashboard/driver/page.tsx` | `DriverDashboard` |
| `routes/dashboard.driver.account.tsx` | `app/dashboard/driver/account/page.tsx` | `DriverAccount` |
| `routes/dashboard.driver.active.tsx` | `app/dashboard/driver/active/page.tsx` | `DriverActive` |
| `routes/dashboard.driver.history.tsx` | `app/dashboard/driver/history/page.tsx` | `DriverHistory` |
| `routes/dashboard.stable.index.tsx` | `app/dashboard/stable/page.tsx` | `StableOverview` |
| `routes/dashboard.stable.horses.tsx` | `app/dashboard/stable/horses/page.tsx` | `StableHorses` |
| `routes/dashboard.stable.manage.tsx` | `app/dashboard/stable/manage/page.tsx` | `StableManage` |
| `routes/dashboard.stable.os.tsx` | `app/dashboard/stable/os/page.tsx` | `StableOS` |
| `routes/dashboard.stable.schedule.tsx` | `app/dashboard/stable/schedule/page.tsx` | `StableSchedule` |
| `routes/dashboard.cx-media.tsx` | `app/dashboard/cx-media/page.tsx` | `CXMediaDashboard` |
| `routes/dashboard.admin.tsx` | `app/dashboard/admin/page.tsx` | `AdminGlobal` |
| `(new)` | `app/partner/page.tsx` | `Quiet-luxury stub` |
| `(new)` | `app/subscriptions/page.tsx` | `Quiet-luxury stub` |
| `(new)` | `app/studios/page.tsx` | `Quiet-luxury stub` |
| `(new)` | `app/payment/page.tsx` | `PaymentSuccess (full /payment)` |
| `(new)` | `app/admin/page.tsx` | `Admin index` |
| `(new)` | `app/users/page.tsx` | `Users index` |
| `(new)` | `app/[locale]/page.tsx` | `Locale stub` |
| `(new)` | `app/[slug]/page.tsx` | `Slug stub` |
