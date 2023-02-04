namespace $.$$ {

	export class $koplenov_rss extends $.$koplenov_rss {

		@$mol_mem
		proxy() {
			return "http://localhost:8081/"
		}

		@$mol_mem
		raw_xml_posts() {
			return $mol_fetch.text( this.proxy() + "https://dmoth.site/posts/index.xml" )
		}

		@$mol_mem
		posts() {
			const data = new window.DOMParser().parseFromString( this.raw_xml_posts(), "text/xml" )
			const items = data.querySelectorAll( "item" )
			const posts: { title: string | undefined; link: string | undefined }[] = [];
			items.forEach( item => posts.push( {
				title: item.querySelector( "title" )?.innerHTML,
				link: item.querySelector( "link" )?.innerHTML,
			} ));
			return posts.filter(post => post.title?.includes(this.query()))
		}

		posts_view() {
			return this.posts().map( post => this.Post( post ) )
		}

		post_title(id: any) {
			return id.title
		}
		
		post_link(id: any) {
			return id.link
		}
	}

}
