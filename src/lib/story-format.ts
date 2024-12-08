export const parseStory = (
  input?: string,
): { title: string; story: string } => {
  if (!input) return { title: "", story: "" };

  const titleMatch = input.match(/title:\s*(.+?)\s*story:/);
  const storyMatch = input.match(/story:\s*(.*)/s);

  console.log(storyMatch);

  // Match the "title" and "story" parts without the "s" flag and make the labels case-insensitive
  //   const titleMatch = input.match(/([a-zA-Z]+):\s*(.+?)\s*(?=[a-zA-Z]+:\s*)/);
  //   const storyMatch = input.match(/([a-zA-Z]+):\s*(.*)/);

  if (!titleMatch || !storyMatch) {
    return { title: "", story: input };
  }

  // Extract and trim the title and story
  const title = titleMatch[1].trim();
  const story = storyMatch[1].trim();

  return { title, story };
};
