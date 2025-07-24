import { Rocket, Keyboard, LayoutDashboard, Briefcase, FileText, HelpCircle, Palette, CreditCard, User, Users, ArrowLeftRight, Link2, Mail } from "lucide-react";

export const sidebar = {
    items: [
      {
        title: "Getting started",
        description: "Get to know Whimsical at a high level so you can start creating.",
        hasChevron: true,
        iconHtml: <Rocket />,
        subitems: [
          { title: "Getting started with sequence diagrams", slug: "getting-started/sequence-diagrams" },
          { title: "What is Whimsical?", slug: "getting-started/what-is-whimsical" },
          { title: "Getting started with docs", slug: "getting-started/docs" },
          { title: "What can you do with Whimsical?", slug: "getting-started/what-can-you-do" },
          { title: "Getting to know Whimsical - video overview", slug: "getting-started/video-overview" },
        ],
      },
      {
        title: "Keyboard shortcuts",
        description: "Keep your hands off the mouse, and use Whimsical at speed.",
        hasChevron: true,
        iconHtml: <Keyboard />,
        subitems: [
          { title: "General shortcuts", slug: "keyboard-shortcuts/general" },
          { title: "Board shortcuts", slug: "keyboard-shortcuts/board" },
        ],
      },
      {
        title: "Whimsical boards",
        description: "Build diagrams, design wireframes & manage cards.",
        hasChevron: true,
        iconHtml: <LayoutDashboard />,
        subitems: [
          { title: "Creating boards", slug: "whimsical-boards/creating" },
          { title: "Board templates", slug: "whimsical-boards/templates" },
        ],
      },
      {
        title: "Whimsical projects",
        description: "Manage your projects calmly from idea to completion.",
        hasChevron: true,
        iconHtml: <Briefcase />,
        subitems: [
          { title: "Creating projects", slug: "whimsical-projects/creating" },
          { title: "Project management", slug: "whimsical-projects/management" },
        ],
      },
      {
        title: "Whimsical docs",
        description: "Create rich and connected long form content.",
        hasChevron: true,
        iconHtml: <FileText />,
        subitems: [
          { title: "Creating docs", slug: "whimsical-docs/creating" },
          { title: "Formatting text", slug: "whimsical-docs/formatting" },
        ],
      },
      {
        title: "FAQs",
        description: "Get answers to frequently asked questions.",
        hasChevron: true,
        iconHtml: <HelpCircle />,
        subitems: [
          { title: "General questions", slug: "faqs/general" },
          { title: "Billing questions", slug: "faqs/billing" },
        ],
      },
      {
        title: "Themes & templates",
        description: "Produce consistent, quick and beautiful content easily.",
        hasChevron: true,
        iconHtml: <Palette />,
        subitems: [
          { title: "Using themes", slug: "themes-templates/themes" },
          { title: "Creating templates", slug: "themes-templates/templates" },
        ],
      },
      {
        title: "Subscription & billing",
        description: "Understand your invoices and update your billing information.",
        hasChevron: true,
        iconHtml: <CreditCard />,
        subitems: [
          { title: "Plans & pricing", slug: "subscription-billing/plans" },
          { title: "Payment methods", slug: "subscription-billing/payment" },
        ],
      },
      {
        title: "Account settings",
        description: "",
        hasChevron: true,
        iconHtml: <User />,
        subitems: [
          { title: "Profile settings", slug: "account-settings/profile" },
          { title: "Notification preferences", slug: "account-settings/notifications" },
        ],
      },
      {
        title: "Workspace settings",
        description: "",
        hasChevron: true,
        iconHtml: <Users />,
        subitems: [
          { title: "Workspace settings", slug: "managing-workspaces/settings" },
          { title: "Member management", slug: "managing-workspaces/members" },
        ],
      },
      {
        title: "Imports & exports",
        description: "",
        hasChevron: true,
        iconHtml: <ArrowLeftRight />,
        subitems: [
          { title: "Importing files", slug: "imports-exports/importing" },
          { title: "Exporting content", slug: "imports-exports/exporting" },
        ],
      },
      {
        title: "Integrations",
        description: "",
        hasChevron: true,
        iconHtml: <Link2 />,
        subitems: [
          { title: "Available integrations", slug: "integrations/available" },
          { title: "Setting up integrations", slug: "integrations/setup" },
        ],
      },
      {
        title: "Contact us",
        description: "",
        hasChevron: false,
        hasExternalLink: true,
        iconHtml: <Mail />,
      },
    ]
}