const baseUrl = 'https://randomuser.me/api/?results=12';

const mentorList = document.getElementById('mentor-list');
const mentorLoading = document.getElementById(
  'mentor-loading',
);
const mentorError = document.getElementById('mentor-error');
const mentorRetry = document.getElementById('mentor-retry');

// helper: create an element with classes and optional text
const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const createMentorCard = mentor => {
  const fullName = `${mentor.name.first} ${mentor.name.last}`;

  const col = createElement(
    'div',
    'col-sm-6 col-lg-4 col-xl-3',
  );
  const card = createElement(
    'div',
    'card card-hover h-100 border-0 shadow-sm text-center',
  );
  const body = createElement('div', 'card-body p-4');

  const photo = createElement(
    'img',
    'mentor-photo rounded-circle mb-3',
  );
  photo.src = mentor.picture.large;
  photo.alt = fullName;
  photo.loading = 'lazy';

  const name = createElement(
    'h3',
    'h5 fw-bold mb-1',
    fullName,
  );
  const location = createElement(
    'p',
    'text-secondary small mb-3',
    `${mentor.location.city}, ${mentor.location.country}`,
  );

  const email = createElement(
    'a',
    'btn btn-sm btn-outline-secondary text-truncate mw-100',
    mentor.email,
  );
  email.href = `mailto:${mentor.email}`;

  body.append(photo, name, location, email);
  card.append(body);
  col.append(card);

  return col;
};

const renderMentors = mentors => {
  mentorList.replaceChildren();
  mentors.forEach(mentor => {
    mentorList.append(createMentorCard(mentor));
  });
};

const fetchMentors = async () => {
  mentorLoading.classList.remove('d-none');
  mentorError.classList.add('d-none');

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}`,
      );
    }

    const data = await response.json();
    renderMentors(data.results);
  } catch (error) {
    console.error(error);
    mentorError.classList.remove('d-none');
  } finally {
    mentorLoading.classList.add('d-none');
  }
};

mentorRetry.addEventListener('click', fetchMentors);
document.getElementById('year').textContent =
  new Date().getFullYear();

fetchMentors();
