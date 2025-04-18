export default async function(eleventyConfig) {
	return {
		dir: {
			input: "src"
		},

		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	}
};
