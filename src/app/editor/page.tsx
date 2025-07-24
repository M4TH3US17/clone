import EditorSection from "./components/editor";
import ArticlePreviewSection from "./components/article-preview";

export default function EditorPage() {

    return <main className="bg-neutral flex h-[100vh]">
        <EditorSection />
        <ArticlePreviewSection />
    </main>
}