const token = "place your token here";

const getGitHubUserDetails = async () => {
  const input = document.querySelector("input");
  const username = input.value;

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user details. Status: ${response.status}`
      );
    }

    const user = await response.json();
    updateUserInfo(user);
  } catch (error) {
    console.error(`Error fetching user details: ${error.message}`);
  }
};

const updateUserInfo = (user) => {
  document.querySelector(".name").innerHTML = user.name;
  document.querySelector(".bio").innerHTML = user.bio;
  document.querySelector(".location").innerHTML = user.location;
  document.querySelector(".website").href = user.blog;
  document.querySelector(".website").innerHTML = user.blog;
  document.querySelector(".github").href = user.html_url;
  document.querySelector(".github").innerHTML = user.html_url;
  document.querySelector(".avatar").src = user.avatar_url;
};

const getGitHubRepoLanguages = async (repoName) => {
  const input = document.querySelector("input");
  const username = input.value;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/languages`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch languages for ${repoName}. Status: ${response.status}`
      );
    }

    const languages = await response.json();
    return Object.keys(languages); // Return an array of languages
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}: ${error.message}`);
  }
};

const getGitHubRepos = async (currentPage) => {
  const input = document.querySelector("input");
  const username = input.value;

  const repoContainer = document.querySelector(".repo-container");
  const buttonsContainer = document.querySelector(".buttons");
  repoContainer.innerHTML = ""; // Clear previous repositories
  buttonsContainer.innerHTML = ""; // Clear previous buttons

  try {
    const perPage = 100;
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${perPage}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch repositories. Status: ${response.status}`
      );
    }

    const repos = await response.json();
    const reposPerPage = 10;
    const startIndex = (currentPage - 1) * reposPerPage;
    const endIndex = startIndex + reposPerPage;
    const currentRepos = repos.slice(startIndex, endIndex);

    for (const repo of currentRepos) {
      const repodiv = document.createElement("div");
      repodiv.classList.add("repodiv");
      const repoName = document.createElement("h3");
      const repoDesc = document.createElement("p");
      const repoLang = document.createElement("div");
      repoLang.classList.add("repo-lang");

      repoName.innerHTML = repo.name;
      repoDesc.innerHTML = repo.description
        ? repo.description
        : "No description provided";

      const languages = await getGitHubRepoLanguages(repo.name);
      if (languages && languages.length > 0) {
        languages.forEach((language) => {
          const languagePara = document.createElement("p");
          languagePara.innerHTML = language;
          languagePara.classList.add("language");
          repoLang.appendChild(languagePara);
        });
      } else {
        const noLangPara = document.createElement("p");
        noLangPara.innerHTML = "No languages found";
        repoLang.appendChild(noLangPara);
      }

      repodiv.appendChild(repoName);
      repodiv.appendChild(repoDesc);
      repodiv.appendChild(repoLang);

      repoContainer.appendChild(repodiv);
    }

    // Add pagination controls
    const totalPages = Math.ceil(repos.length / reposPerPage);

    // Previous button
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "<";
    prevButton.classList.add("prev-button");
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        getGitHubRepos(currentPage - 1); // Fetch and display the previous page
      }
    });
    buttonsContainer.appendChild(prevButton);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageNumber = document.createElement("div");
      pageNumber.innerHTML = i;
      pageNumber.classList.add("page-number");

      if (i === currentPage) {
        pageNumber.classList.add("active-btn");
      }

      pageNumber.addEventListener("click", () => {
        getGitHubRepos(i); // Fetch and display the selected page
      });
      buttonsContainer.appendChild(pageNumber);
    }

    // Next button
    const nextButton = document.createElement("button");
    nextButton.innerHTML = ">";
    nextButton.classList.add("next-button");
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        getGitHubRepos(currentPage + 1); // Fetch and display the next page
      }
    });
    buttonsContainer.appendChild(nextButton);
  } catch (error) {
    console.error(`Error fetching GitHub repositories: ${error.message}`);
  }
};

document.querySelector(".submit").addEventListener("click", function () {
  getGitHubUserDetails();
  getGitHubRepos(1); // Start with the first page
});

document.querySelector("input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getGitHubUserDetails();
    getGitHubRepos(1); // Start with the first page
  }
});

// load initial data

document.addEventListener("DOMContentLoaded", function () {
  const token = "place your token here";

  const getGitHubUserDetails = async () => {
    const username = "danish49";

    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch user details. Status: ${response.status}`
        );
      }

      const user = await response.json();
      updateUserInfo(user);
    } catch (error) {
      console.error(`Error fetching user details: ${error.message}`);
    }
  };

  const updateUserInfo = (user) => {
    document.querySelector(".name").innerHTML = user.name;
    document.querySelector(".bio").innerHTML = user.bio;
    document.querySelector(".location").innerHTML = user.location;
    document.querySelector(".website").href = user.blog;
    document.querySelector(".website").innerHTML = user.blog;
    document.querySelector(".github").href = user.html_url;
    document.querySelector(".github").innerHTML = user.html_url;
    document.querySelector(".avatar").src = user.avatar_url;
  };

  const getGitHubRepoLanguages = async (repoName) => {
    const username = "danish49";

    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/languages`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch languages for ${repoName}. Status: ${response.status}`
        );
      }

      const languages = await response.json();
      return Object.keys(languages); // Return an array of languages
    } catch (error) {
      console.error(
        `Error fetching languages for ${repoName}: ${error.message}`
      );
    }
  };

  const getGitHubRepos = async (currentPage) => {
    const username = "danish49";

    const repoContainer = document.querySelector(".repo-container");
    const buttonsContainer = document.querySelector(".buttons");
    repoContainer.innerHTML = ""; // Clear previous repositories
    buttonsContainer.innerHTML = ""; // Clear previous buttons

    try {
      const perPage = 100;
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch repositories. Status: ${response.status}`
        );
      }

      const repos = await response.json();
      const reposPerPage = 10;
      const startIndex = (currentPage - 1) * reposPerPage;
      const endIndex = startIndex + reposPerPage;
      const currentRepos = repos.slice(startIndex, endIndex);

      for (const repo of currentRepos) {
        const repodiv = document.createElement("div");
        repodiv.classList.add("repodiv");
        const repoName = document.createElement("h3");
        const repoDesc = document.createElement("p");
        const repoLang = document.createElement("div");
        repoLang.classList.add("repo-lang");

        repoName.innerHTML = repo.name;
        repoDesc.innerHTML = repo.description
          ? repo.description
          : "No description provided";

        const languages = await getGitHubRepoLanguages(repo.name);
        if (languages && languages.length > 0) {
          languages.forEach((language) => {
            const languagePara = document.createElement("p");
            languagePara.classList.add("language");
            languagePara.innerHTML = language;
            repoLang.appendChild(languagePara);
          });
        } else {
          const noLangPara = document.createElement("p");
          noLangPara.innerHTML = "No languages found";
          repoLang.appendChild(noLangPara);
        }

        repodiv.appendChild(repoName);
        repodiv.appendChild(repoDesc);
        repodiv.appendChild(repoLang);

        repoContainer.appendChild(repodiv);
      }

      // Add pagination controls
      const totalPages = Math.ceil(repos.length / reposPerPage);

      // Previous button
      const prevButton = document.createElement("button");
      prevButton.innerHTML = "<";
      prevButton.classList.add("prev-button");
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          getGitHubRepos(currentPage - 1); // Fetch and display the previous page
        }
      });
      buttonsContainer.appendChild(prevButton);

      for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement("div");
        pageNumber.innerHTML = i;
        pageNumber.classList.add("page-number");

        // Check if it's the active page and add the class
        if (i === currentPage) {
          pageNumber.classList.add("active-btn");
        }

        pageNumber.addEventListener("click", () => {
          getGitHubRepos(i); // Fetch and display the selected page
        });
        buttonsContainer.appendChild(pageNumber);
      }

      // Next button
      const nextButton = document.createElement("button");
      nextButton.innerHTML = ">";
      nextButton.classList.add("next-button");
      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          getGitHubRepos(currentPage + 1); // Fetch and display the next page
        }
      });
      buttonsContainer.appendChild(nextButton);
    } catch (error) {
      console.error(`Error fetching GitHub repositories: ${error.message}`);
    }
  };

  getGitHubUserDetails();
  getGitHubRepos(1); // Start with the first page
});
