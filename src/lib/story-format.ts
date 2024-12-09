export const formatStory = (
  input?: string,
): { title: string; story: string } => {
  if (!input) return { title: "", story: "" };

  //Format output AI to take title: TITLE and story: STORY
  const titleMatch = input.match(/title:\s*(.+?)\s*story:/);
  const storyMatch = input.match(/story:\s*(.*)/s);

  console.log(storyMatch);

  if (!titleMatch || !storyMatch) {
    return { title: "", story: input };
  }

  const title = titleMatch[1].trim();
  const story = storyMatch[1].trim();

  return { title, story };
};
