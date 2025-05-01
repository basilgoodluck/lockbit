interface TextInputProps {
    text: string;
    setText: (text: string) => void;
  }
  
  export function TextInput({ text, setText }: TextInputProps) {
    return (
      <div className="space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
          className="overflow-auto scrollbar-none resize-none w-full p-3 rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent-500"
          rows={4}
        />
      </div>
    );
  }