var courses = [
  {
    title: 'Event Driven Cakes',
    cost: 50
  },
  {
    title: 'Asynchronous Artichoke',
    cost: 25
  }, {
    title: 'Object Oriented Orange Juice',
    cost: 10
  }
];

exports.showCourses =  function ( req, res ) {
  res.render( 'courses', {
    offeredCourses: courses
  } );
};

exports.showSignUp = ( req, res ) => {
  res.render( 'contact' );
};

exports.postedContactForm = ( req, res ) => {
  res.render( 'thanks' );
};
